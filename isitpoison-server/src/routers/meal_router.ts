import express from "express";
import { delete_meal, insert_meal, select_meal, select_meals, select_weekly_meals, update_meal } from "../queries/meal_queries.js";
import { ordering, Ordering } from "../model/types.js";

export const meal_router = express.Router();

meal_router.get("/:canteen_id(\\d+)/:weekday(\\d+)", async (req, res) => {
    const canteen_id = Number(req.params["canteen_id"]);
    const weekday = Number(req.params["weekday"]);

    res.json((await select_weekly_meals(canteen_id, weekday)).rows);
});

meal_router.get("/:id(\\d+)", async (req, res) => {
    const id = Number(req.params["id"]);

    const result = await select_meal(id);

    if (result.rowCount === 0) {
        res.status(404).send("Meal not found.");
    }
    res.json(result.rows[0]);
});

meal_router.get("/", async (req, res) => {
    let canteen_ids: number[];
    try {
        canteen_ids = JSON.parse(req.query["canteens"]?.toString() ?? "[]");
    } catch {
        res.status(400).send("incorrect format of 'canteens' field");
        return;
    }
    const order = ordering(req.query["ordering"]?.toString() ?? "") ?? Ordering.Alphabetical;
    const ascending = req.query["descending"] !== undefined;
    const search = req.query["search"]?.toString().toLowerCase();

    res.json((await select_meals(canteen_ids, order, ascending, search)).rows);
});

meal_router.delete("/:id(\\d+)", async (req, res) => {
    const id = Number(req.params["id"]);
    
    if (req.session && req.session.userId && req.session.isAdmin) {
        try {
            const result = await delete_meal(id);
            if (result.rowCount === 0) {
                res.status(400).send("meals does not exist");
            } else {
                res.send();
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                res.status(400).send(e.message);
            } else {
                res.status(500).send("unknown error");
            }
        }
    } else {
        res.status(401).send();
    }
    
});

meal_router.post("/", async (req, res) => {
    const meal = req.body;

    if (req.session && req.session.userId && req.session.isAdmin) {
        if (typeof meal["name"] !== "string") {
            res.status(400).send("field 'name' of type string is required");
            return;
        }
        if (typeof meal["canteen_id"] !== "number") {
            res.status(400).send("field 'canteen_id' of type number is required");
            return;
        }

        try {
            await insert_meal(meal["name"], meal["canteen_id"]);
            res.send();
        } catch (e: unknown) {
            if (e instanceof Error) {
                if (e.message.includes("duplicate key")) {
                    res.status(400).send("meal already exists");
                } else if (e.message.includes("meals_canteen_id_fkey")) {
                    res.status(400).send(`canteen with ID ${meal["canteen_id"]} does not exist`);
                } else {
                    res.status(400).send(e.message);
                }
            } else {
                res.status(500).send("unknown error");
            }
        }
    } else {
        res.status(401).send();
    }
});

// TODO admin only
meal_router.put("/:id(\\d+)", async (req, res) => {
    const id = Number(req.params["id"]);
    const meal = req.body;

    if (req.session && req.session.userId && req.session.isAdmin) {
        if (typeof meal["name"] !== "string") {
            res.status(400).send("field 'name' of type string is required");
            return;
        }
        if (typeof meal["canteen_id"] !== "number") {
            res.status(400).send("field 'canteen_id' of type number is required");
            return;
        }
    
        try {
            const result = await update_meal(id, meal["name"], meal["canteen_id"]);
            if (result.rowCount === 0) {
                res.status(400).send("meal does not exist");
            } else {
                res.send();
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                if (e.message.includes("meals_canteen_id_fkey")) {
                    res.status(400).send(`canteen with ID ${meal["canteen_id"]} does not exist`);
                } else {
                    res.status(400).send(e.message);
                }
            } else {
                res.status(500).send("unknown error");
            }
        }
    } else {
        res.status(401).send();
    }
});
