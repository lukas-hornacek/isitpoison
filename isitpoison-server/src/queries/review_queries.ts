import { database } from "../model/database_connection.js";

export async function select_review_by_meal(id: number) {
    const query = {
        text: "SELECT * FROM reviews WHERE meal_id=$1",
        values: [id],
    };
    return await database.query(query);
}

export async function select_review_by_user(id: number) {
    const query = {
        text: "SELECT * FROM reviews WHERE user_id=$1",
        values: [id],
    };
    return await database.query(query);
}