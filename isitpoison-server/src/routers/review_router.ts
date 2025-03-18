import express from "express";
import { select_review_by_meal, select_review_by_user } from "../queries/review_queries.js";

export const review_router = express.Router();

review_router.get("/meal/:id(\\d+)", async (req, res) => {
    const id = Number(req.params["id"]);
    res.json((await select_review_by_meal(id)).rows);
});

review_router.get("/user/:id(\\d+)", async (req, res) => {
    const id = Number(req.params["id"]);
    res.json((await select_review_by_user(id)).rows);
});