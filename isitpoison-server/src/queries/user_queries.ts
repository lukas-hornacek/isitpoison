import { database } from "../model/database_connection.js";

export async function select_user(id: number) {
    const query = {
        text: `SELECT users.id, username, joined, COUNT(reviews.id) AS reviews, is_admin
        FROM users, reviews
        WHERE users.id=$1 AND users.id=user_id
        GROUP BY users.id, username, joined, is_admin`,
        values: [id],
    };
    return await database.query(query);
}