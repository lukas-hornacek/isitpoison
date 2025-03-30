import * as cheerio from "cheerio";
import { database } from "./model/database_connection.js";
import { Weekday } from "./model/types.js";

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
            text: "SELECT meals.id FROM meals, weekly_meals WHERE id=meal_id AND weekday=$1",
            values: [new Date().getDay()],
        };
        const result = (await database.query(select)).rows.map(r => r["id"]).join(", ");

        const update = {
            text: `UPDATE meals SET last_served=CURRENT_DATE WHERE id IN (${result})`,
        };
        await database.query(update);
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error(e.message);
        }
    }
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
}

async function updateEatAndMeet() {
    const $ = await cheerio.fromURL("https://eatandmeet.sk/tyzdenne-menu");

    for (let day = 1; day <= 7; day++) {
        const meals: string[] = $(`#day-${day} .desc`).map((_, el) => $(el).text().replace(/\(.*\)/g, "").trim()).get();
   
        for (const meal of meals) {
            insert(meal, Canteens.EatAndMeet, (day % 7));
        }
    }
}

async function updateFunweston(canteen: Canteens) {
    const $ = await cheerio.fromURL("http://www.freefood.sk/menu/");

    const ids = ["fayn-food", "free-food", "fiit-food"];

    $(`#${ids[canteen - 2]} .daily-offer > li`).each((i, dayElement) => {
        $(dayElement)
            .find(".day-offer > li")
            .each((_, mealElement) => {
                const mealText = $(mealElement).text().trim();
                let end = mealText.search(/(\d+g)|(\d+(,\d+)?l)/);
                if (end === -1) {
                    end = mealText.search(/\d+(.\d+)?€/);
                }
                const meal = mealText.substring(3, end);

                insert(meal, canteen, i + 1);
            });
    });
}

async function insert(name: string, canteen_id: Canteens, day: Weekday) {
    const select = {
        text: "SELECT id FROM meals WHERE name=$1 AND canteen_id=$2",
        values: [name, canteen_id],
    };
    let result = await database.query(select);

    if (result.rowCount === 0) {
        try {
            const insert = {
                text: "INSERT INTO meals (name, canteen_id, uploaded) VALUES ($1, $2, CURRENT_DATE) RETURNING id",
                values: [name, canteen_id],
            };
            result = await database.query(insert);
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.log(e.message);
            }
            return;
        }
    }
    
    const weekly = {
        text: "INSERT INTO weekly_meals (meal_id, weekday) VALUES ($1, $2)",
        values: [result.rows[0]["id"], day],
    };
    await database.query(weekly);
}