import express from "express";
import { select_user } from "../queries/user_queries.js";

export const user_router = express.Router();

user_router.get("/:id(\\d+)", async (req, res) => {
    const id = Number(req.params["id"]);

    const result = await select_user(id);

    if (result.rowCount === 0) {
        res.status(404).send("User not found.");
    }
    res.json(result.rows[0]);
});
