import { database } from "../model/database_connection.js";

export async function select_users(search?: string) {
    let text = `SELECT users.id, username, joined, COUNT(reviews.id) AS reviews, is_admin
        FROM users, reviews
        WHERE users.id=user_id`;
    const values = [];

    if (search) {
        text += " AND LOWER(username) LIKE '%' || $1 || '%'";
        values.push(search);
    }

    text += "\nGROUP BY users.id, username, joined, is_admin";

    const query = {
        text: text,
        values: values
    };
    return await database.query(query);
}

export async function select_user_by_id(id: number) {
    const query = {
        text: `SELECT users.id, username, joined, COUNT(reviews.id) AS reviews, is_admin
        FROM users, reviews
        WHERE users.id=$1 AND users.id=user_id
        GROUP BY users.id, username, joined, is_admin`,
        values: [id],
    };
    return await database.query(query);
}

export async function select_user_by_name(username: string) {
    const query = {
        text: "SELECT id, password FROM users WHERE username=$1",
        values: [username],
    };
    return await database.query(query);
}

export async function insert_user(username: string, password: string, is_admin: boolean) {
    const select = {
        text: "SELECT * FROM users WHERE username=$1",
        values: [username],
    };
    const result = await database.query(select);
    if (result.rowCount !== 0) {
        throw new Error("Username is already taken.");
    }

    const insert = {
        text: `INSERT INTO users (username, password, joined, is_admin)
        VALUES ($1, $2, CURRENT_DATE, $3)`,
        values: [username, password, is_admin],
    };    
    return await database.query(insert);
}

export async function delete_user(id: number) {
    const query = {
        text: "DELETE FROM users WHERE id=$1",
        values: [id],
    };
    return await database.query(query);
}