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