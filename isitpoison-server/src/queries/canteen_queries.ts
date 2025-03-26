import { database } from "../model/database_connection.js";

export async function select_canteens(search?: string) {
    let text = "SELECT * FROM canteens";
    const values = [];

    if (search) {
        text += "\nWHERE LOWER(name) LIKE '%' || $1 || '%'";
        values.push(search);
    }

    const query = {
        text: text,
        values: values,
    };
    return await database.query(query);
}

export async function select_canteen(id: number) {
    const query = {
        text: "SELECT * FROM canteens WHERE id=$1",
        values: [id],
    };
    return await database.query(query);
}

export async function select_canteen_detail(id: number) {
    const query = {
        text: "SELECT * FROM canteen_details WHERE canteen_id=$1",
        values: [id],
    };
    return await database.query(query);
}