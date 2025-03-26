import express from "express";
import { select_review_by_meal, select_review_by_user, select_reviews } from "../queries/review_queries.js";

export const review_router = express.Router();

// TODO admin only
review_router.get("/", async (_req, res) => {
    res.json((await select_reviews()).rows);
});

review_router.get("/meal/:id(\\d+)", async (req, res) => {
    const id = Number(req.params["id"]);
    res.json((await select_review_by_meal(id)).rows);
});

// TODO admin or logged in user only
review_router.get("/user/:id(\\d+)", async (req, res) => {
    const id = Number(req.params["id"]);
    res.json((await select_review_by_user(id)).rows);
});