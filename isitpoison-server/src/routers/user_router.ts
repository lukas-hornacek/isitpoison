import express from "express";
import { select_user_by_id, select_users } from "../queries/user_queries.js";

export const user_router = express.Router();

// TODO admin only
user_router.get("/", async (req, res) => {
    const search = req.query["search"]?.toString().toLowerCase();

    res.json((await select_users(search)).rows);
});

// TODO admin or logged in user only
user_router.get("/:id(\\d+)", async (req, res) => {
    const id = Number(req.params["id"]);

    const result = await select_user_by_id(id);

    if (result.rowCount === 0) {
        res.status(404).send("User not found.");
    }
    res.json(result.rows[0]);
});
