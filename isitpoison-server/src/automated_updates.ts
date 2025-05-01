import * as cheerio from "cheerio";
import { database } from "./model/database_connection.js";
import { Weekday } from "./model/types.js";
import { QueryResult, QueryResultRow } from "pg";

enum Canteens {
    EatAndMeet = 1,
    FaynFood = 2,
    FreeFood = 3,
    FiitFood = 4,
}

// ran each day
export async function updateLastServed() {
    try {
        const select =  {
            text: "SELECT id FROM meals, weekly_meals WHERE id=meal_id AND weekday=$1",
            values: [new Date().getDay()],
        };
        const result = (await database.query(select)).rows.map(r => r["id"]).join(", ");

        if (result === "") {
            throw new Error("no meals served today");
        }

        const update = {
            text: `UPDATE meals SET last_served=CURRENT_DATE WHERE id IN (${result})`,
        };
        await database.query(update);
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error(e.message);
        }
    }

    console.log("daily update");
}

// ran each week
export async function updateWeeklyMeals() {
    try {
        const del = {
            text: "DELETE FROM weekly_meals",
        };
        await database.query(del);
    
        updateEatAndMeet();
        updateFunweston(Canteens.FaynFood);
        updateFunweston(Canteens.FreeFood);
        updateFunweston(Canteens.FiitFood);
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error(e.message);
        }
    }

    console.log("weekly update");
}

async function updateEatAndMeet() {
    const $ = await cheerio.fromURL("https://eatandmeet.sk/tyzdenne-menu");

    for (let day = 1; day <= 7; day++) {
        const meals: string[] = $(`#day-${day} .desc`).map((_, el) => $(el).text().replace(/\(.*\)/g, "").trim()).get();
   
        for (const meal of meals) {
            await insert(meal, Canteens.EatAndMeet, (day % 7));
        }
    }
}

async function updateFunweston(canteen: Canteens) {
    const $ = await cheerio.fromURL("http://www.freefood.sk/menu/");

    const ids = ["fayn-food", "free-food", "fiit-food"];

    const dayElements = $(`#${ids[canteen - 2]} .daily-offer > li`).toArray();
    let dayIndex = 0;

    for (const dayElement of dayElements) {
        const mealElements = $(dayElement).find(".day-offer > li").toArray();

        for (const mealElement of mealElements) {
            const mealText = $(mealElement).text().trim();
            let end = mealText.search(/(\d+g)|(\d+(,\d+)?l)/);
            if (end === -1) {
                end = mealText.search(/\d+(.\d+)?€/);
            }

            const meal = mealText.substring(3, end);
            await insert(meal, canteen, dayIndex + 1);
        }
        
        dayIndex++;
    }
}

async function insert(name: string, canteen_id: Canteens, day: Weekday) {
    let result: QueryResult<QueryResultRow>;
    try {
        const insert = {
            text: "INSERT INTO meals (name, canteen_id, uploaded) VALUES ($1, $2, CURRENT_DATE) RETURNING id",
            values: [name, canteen_id],
        };
        result = await database.query(insert);
    } catch {
        const select = {
            text: "SELECT id FROM meals WHERE name=$1 AND canteen_id=$2",
            values: [name, canteen_id],
        };
        result = await database.query(select);
    }
    
    const weekly = {
        text: "INSERT INTO weekly_meals (meal_id, weekday) VALUES ($1, $2)",
        values: [result.rows[0]["id"], day],
    };
    await database.query(weekly);
}