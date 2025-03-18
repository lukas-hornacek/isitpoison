import express from "express";
import { select_meal, select_meals, select_weekly_meals } from "../queries/meal_queries.js";
import { ordering, Ordering } from "../model/types.js";

export const meal_router = express.Router();

meal_router.get("/:canteen_id(\\d+)/:weekday(\\d+)", async (req, res) => {
    const canteen_id = Number(req.params["canteen_id"]);
    const weekday = Number(req.params["weekday"]);

    res.json((await select_weekly_meals(canteen_id, weekday)).rows);
});

meal_router.get("/:id(\\d+)", async (req, res) => {
    const id = Number(req.params["id"]);
    res.json((await select_meal(id)).rows[0]);
});

meal_router.get("/", async (req, res) => {
    let canteen_ids: number[];
    try {
        canteen_ids = JSON.parse(req.query["canteens"]?.toString() ?? "[]");
    } catch {
        console.error("incorrect format of 'canteens' field");
        canteen_ids = [];
    }
    const order = ordering(req.query["ordering"]?.toString() ?? "") ?? Ordering.Alphabetical;
    const ascending = req.query["descending"] !== undefined;
    const substring = req.query["substring"]?.toString().toLowerCase() ?? "";

    res.json((await select_meals(canteen_ids, order, ascending, substring)).rows);
});