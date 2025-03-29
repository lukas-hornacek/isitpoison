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

export async function delete_canteen(id: number) {
    let query = {
        text: "DELETE FROM canteen_details WHERE canteen_id=$1",
        values: [id],
    };
    await database.query(query);

    query = {
        text: "DELETE FROM canteens WHERE id=$1",
        values: [id],
    };
    return await database.query(query);
}

export async function insert_canteen(name: string, location: string, monday_open: string, monday_close: string,
    tuesday_open: string, tuesday_close: string, wednesday_open: string, wednesday_close: string,
    thursday_open: string, thursday_close: string, friday_open: string, friday_close: string,
    saturday_open: string, saturday_close: string, sunday_open: string, sunday_close: string) {
    let query = {
        text: "INSERT INTO canteens (name) VALUES ($1) RETURNING id",
        values: [name],
    };

    const id = (await database.query(query)).rows[0]["id"];

    query = {
        text: `INSERT INTO canteen_details (canteen_id, location, monday_open, monday_close,
        tuesday_open, tuesday_close, wednesday_open, wednesday_close, thursday_open, thursday_close,
        friday_open, friday_close, saturday_open, saturday_close, sunday_open, sunday_close) VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
        values: [
            id, location, monday_open, monday_close, tuesday_open, tuesday_close,
            wednesday_open, wednesday_close, thursday_open, thursday_close, friday_open,
            friday_close, saturday_open, saturday_close, sunday_open, sunday_close,
        ],
    };

    await database.query(query);
}

export async function put_canteen(id: number, name: string, location: string, monday_open: string, monday_close: string,
    tuesday_open: string, tuesday_close: string, wednesday_open: string, wednesday_close: string,
    thursday_open: string, thursday_close: string, friday_open: string, friday_close: string,
    saturday_open: string, saturday_close: string, sunday_open: string, sunday_close: string) {
    let query = {
        text: `UPDATE canteen_details SET
        location=$1, monday_open=$2, monday_close=$3, tuesday_open=$4, tuesday_close=$5,
        wednesday_open=$6, wednesday_close=$7, thursday_open=$8, thursday_close=$9, friday_open=$10,
        friday_close=$11, saturday_open=$12, saturday_close=$13, sunday_open=$14, sunday_close=$15
        WHERE canteen_id=$16`,
        values: [location, monday_open, monday_close, tuesday_open, tuesday_close,
            wednesday_open, wednesday_close, thursday_open, thursday_close, friday_open,
            friday_close, saturday_open, saturday_close, sunday_open, sunday_close, id],
    };
    await database.query(query);

    query = {
        text: "UPDATE canteens SET name=$1 WHERE id=$2",
        values: [name, id],
    };
    return await database.query(query);
}