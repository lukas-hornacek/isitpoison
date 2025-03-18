import { database } from "../model/database_connection.js";

export async function select_canteens() {
    const query = {
        text: "SELECT * FROM canteens"
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