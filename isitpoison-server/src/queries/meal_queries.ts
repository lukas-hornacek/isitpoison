import { database } from "../model/database_connection.js";
import { Ordering } from "../model/types.js";

export async function select_meal(id: number) {
    const query = {
        text: `SELECT meals.id, name, canteen_id, last_served, meals.uploaded, COALESCE(AVG(reviews.rating), 0) AS rating
        FROM meals
        LEFT OUTER JOIN reviews ON meals.id=reviews.meal_id
        WHERE meals.id=$1
        GROUP BY meals.id, name, canteen_id, last_served, meals.uploaded`,
        values: [id],
    };
    return await database.query(query);
}

export async function select_weekly_meals(canteen_id: number, weekday: number) {
    const query = {
        text: `SELECT meals.id, name, canteen_id, last_served, meals.uploaded, COALESCE(AVG(reviews.rating), 0) AS rating
        FROM meals
        JOIN weekly_meals ON meals.id=weekly_meals.meal_id
        LEFT OUTER JOIN reviews ON meals.id=reviews.meal_id
        WHERE canteen_id=$1 AND weekday=$2
        GROUP BY meals.id, name, canteen_id, last_served, meals.uploaded`,
        values: [canteen_id, weekday],
    };
    return await database.query(query);
}

export async function select_meals(canteen_ids: number[], ordering: Ordering, ascending: boolean, search?: string) {  
    let text = `SELECT meals.id, name, canteen_id, last_served, meals.uploaded, COALESCE(AVG(reviews.rating), 0) AS rating
    FROM meals
    LEFT OUTER JOIN reviews ON meals.id=reviews.meal_id`;
    const values = [];

    if (canteen_ids.length !== 0) {
        text += " AND canteen_id IN (" + canteen_ids.join(", ") + ")";
    }

    if (search) {
        text += " AND LOWER(name) LIKE '%' || $1 || '%'";
        values.push(search);
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

export async function delete_meal(id: number) {
    const query = {
        text: "DELETE FROM meals WHERE id=$1",
        values: [id],
    };
    return await database.query(query);
}

export async function insert_meal(name: string, canteen_id: number) {
    let query = {
        text: "SELECT * FROM meals WHERE name=$1 AND canteen_id=$2",
        values: [name, canteen_id],
    };
    const result = await database.query(query);
    if (result.rowCount !== 0) {
        throw new Error("meal already exists");
    }

    query = {
        text: "INSERT INTO meals (name, canteen_id, uploaded) VALUES ($1, $2, CURRENT_DATE)",
        values: [name, canteen_id],
    };    
    return await database.query(query);
}

export async function update_meal(id: number, name: string, canteen_id: number) {
    const query = {
        text: "UPDATE meals SET name=$1, canteen_id=$2 WHERE id=$3",
        values: [name, canteen_id, id],
    };
    return await database.query(query);
}
