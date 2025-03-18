import express from "express";
import { select_user } from "../queries/user_queries.js";

export const user_router = express.Router();

user_router.get("/:id(\\d+)", async (req, res) => {
    const id = Number(req.params["id"]);
    res.json((await select_user(id)).rows);
});
