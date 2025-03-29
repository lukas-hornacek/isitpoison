import { database } from "../model/database_connection.js";

export async function select_reviews(search?: string) {
    let text = "SELECT * FROM reviews";
    const values = [];

    if (search) {
        text += "\nWHERE LOWER(text) LIKE '%' || $1 || '%'";
        values.push(search);
    }

    text += "\nORDER BY uploaded DESC";

    const query = {
        text: text,
        values: values,
    };
    return await database.query(query);
}

export async function select_review_by_meal(id: number) {
    const query = {
        text: "SELECT * FROM reviews WHERE meal_id=$1 ORDER BY uploaded DESC",
        values: [id],
    };
    return await database.query(query);
}

export async function select_review_by_user(id: number) {
    const query = {
        text: "SELECT * FROM reviews WHERE user_id=$1 ORDER BY uploaded DESC",
        values: [id],
    };
    return await database.query(query);
}

export async function delete_review(id: number) {
    const query = {
        text: "DELETE FROM reviews WHERE id=$1",
        values: [id],
    };
    return await database.query(query);
}

export async function insert_review(meal_id: number, user_id: number, rating: number, text?: string) {
    const select = {
        text: "SELECT * FROM reviews WHERE meal_id=$1 AND user_id=$2",
        values: [meal_id, user_id],
    };
    const result = await database.query(select);
    if (result.rowCount !== 0) {
        throw new Error("review already exists");
    }

    const insert = {
        text: `INSERT INTO reviews (meal_id, user_id, uploaded, rating, text)
        VALUES ($1, $2, CURRENT_DATE, $3, $4)`,
        values: [meal_id, user_id, rating, text ?? "NULL"],
    };
    return await database.query(insert);
}

export async function update_review(id: number, rating: number, text?: string) {
    const query = {
        text: "UPDATE reviews SET rating=$1, text=$2 WHERE id=$3",
        values: [rating, text ?? "NULL", id],
    };
    return await database.query(query);
}