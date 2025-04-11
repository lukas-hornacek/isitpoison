import express from "express";
import { delete_user, select_user_by_id, select_users } from "../queries/user_queries.js";

export const user_router = express.Router();

user_router.get("/", async (req, res) => {
    if (req.session && req.session.userId && req.session.isAdmin) {
        const search = req.query["search"]?.toString().toLowerCase();

        res.json((await select_users(search)).rows);
    } else {
        res.status(401).send();
    }
});

user_router.get("/:id(\\d+)", async (req, res) => {
    const id = Number(req.params["id"]);
    const result = await select_user_by_id(id);

    if (result.rowCount === 0) {
        res.status(404).send("User not found.");
    } else {
        res.json(result.rows[0]);
    }
});

user_router.delete("/:id(\\d+)", async (req, res) => {
    if (req.session && req.session.isAdmin) {
        const id = Number(req.params["id"]);
        const result = await delete_user(id);

        if (result.rowCount === 0) {
            res.status(404).send("User does not exist.");
        } else {
            res.status(200).send();
        }
    } else {
        res.status(401).send();
    }
});