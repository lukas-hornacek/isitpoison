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

export async function delete_canteen(id: number) {
    const query = {
        text: "DELETE FROM canteens WHERE id=$1",
        values: [id],
    };
    return await database.query(query);
}

export async function insert_canteen(name: string, location: string, monday_open: string, monday_close: string,
    tuesday_open: string, tuesday_close: string, wednesday_open: string, wednesday_close: string,
    thursday_open: string, thursday_close: string, friday_open: string, friday_close: string,
    saturday_open: string, saturday_close: string, sunday_open: string, sunday_close: string) {
    const query = {
        text: `INSERT INTO canteens (name, location, monday_open, monday_close,
        tuesday_open, tuesday_close, wednesday_open, wednesday_close, thursday_open, thursday_close,
        friday_open, friday_close, saturday_open, saturday_close, sunday_open, sunday_close) VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
        values: [name, location, monday_open, monday_close, tuesday_open, tuesday_close,
            wednesday_open, wednesday_close, thursday_open, thursday_close, friday_open,
            friday_close, saturday_open, saturday_close, sunday_open, sunday_close],
    };
    await database.query(query);
}

export async function update_canteen(id: number, name: string, location: string, monday_open: string, monday_close: string,
    tuesday_open: string, tuesday_close: string, wednesday_open: string, wednesday_close: string,
    thursday_open: string, thursday_close: string, friday_open: string, friday_close: string,
    saturday_open: string, saturday_close: string, sunday_open: string, sunday_close: string) {
    const query = {
        text: `UPDATE canteens SET
        name=$1, location=$2, monday_open=$3, monday_close=$4, tuesday_open=$5, tuesday_close=$6,
        wednesday_open=$7, wednesday_close=$8, thursday_open=$9, thursday_close=$10, friday_open=$11,
        friday_close=$12, saturday_open=$13, saturday_close=$14, sunday_open=$15, sunday_close=$16
        WHERE id=$17`,
        values: [name, location, monday_open, monday_close, tuesday_open, tuesday_close,
            wednesday_open, wednesday_close, thursday_open, thursday_close, friday_open,
            friday_close, saturday_open, saturday_close, sunday_open, sunday_close, id],
    };
    return await database.query(query);
}