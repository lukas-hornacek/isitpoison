import express from "express";
import { select_canteen, select_canteen_detail, select_canteens } from "../queries/canteen_queries.js";

export const canteen_router = express.Router();

canteen_router.get("/", async (req, res) => {
    const search = req.query["search"]?.toString().toLowerCase();

    res.json((await select_canteens(search)).rows);
});

canteen_router.get("/:id(\\d+)", async (req, res) => {
    const id = Number(req.params["id"]);

    const result = await select_canteen(id);

    if (result.rowCount === 0) {
        res.status(404).send("Canteen not found.");
    }
    res.json(result.rows[0]);
});

canteen_router.get("/detail/:id(\\d+)", async (req, res) => {
    const id = Number(req.params["id"]);

    const result = await select_canteen_detail(id);

    if (result.rowCount === 0) {
        res.status(404).send("Canteen detail not found.");
    }
    res.json(result.rows[0]);
});