import pg from "pg";

const { Client } = pg;

export const database = new Client({
    user: "isitpoisonuser",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "isitpoisondb",
});

await database.connect();