import { database } from "../model/database_connection.js";
import { Ordering } from "../model/types.js";

export async function select_meal(id: number) {
    const query = {
        text: `SELECT meals.id, name, canteen_id, last_served, meals.uploaded, AVG(reviews.rating) AS rating
        FROM meals, reviews
        WHERE meals.id=$1 AND meals.id=reviews.meal_id
        GROUP BY meals.id, name, canteen_id, last_served, meals.uploaded`,
        values: [id],
    };
    return await database.query(query);
}

export async function select_weekly_meals(canteen_id: number, weekday: number) {
    const query = {
        text: `SELECT meals.id, name, canteen_id, last_served, meals.uploaded, AVG(reviews.rating) AS rating
        FROM meals, reviews, weekly_meals
        WHERE canteen_id=$1 AND weekday=$2 AND meals.id=reviews.meal_id AND meals.id=weekly_meals.meal_id
        GROUP BY meals.id, name, canteen_id, last_served, meals.uploaded`,
        values: [canteen_id, weekday],
    };
    return await database.query(query);
}

export async function select_meals(canteen_ids: number[], ordering: Ordering, ascending: boolean, substring: string) {  
    let text = `SELECT meals.id, name, canteen_id, last_served, meals.uploaded, AVG(reviews.rating) AS rating
    FROM meals, reviews
    WHERE meals.id=reviews.meal_id`;
    const values = [];

    if (canteen_ids.length !== 0) {
        text += " AND canteen_id IN (" + canteen_ids.join(", ") + ")";
    }

    if (substring !== "") {
        text += " AND name LIKE $1";
        values.push("'%" + substring + "%'");
    }

    text += `
    GROUP BY meals.id, name, canteen_id, last_served, meals.uploaded
    ORDER BY ${ordering.valueOf()} ${ascending ? "ASC" : "DESC"}`;

    const query = {
        text: text,
        values: values,
    };

    return await database.query(query);
}