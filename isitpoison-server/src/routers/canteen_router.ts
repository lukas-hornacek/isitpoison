import express from "express";
import { select_canteen, select_canteen_detail, select_canteens } from "../queries/canteen_queries.js";

export const canteen_router = express.Router();

canteen_router.get("/", async (_req, res) => {
    res.json((await select_canteens()).rows);
});

canteen_router.get("/:id(\\d+)", async (req, res) => {
    const id = Number(req.params["id"]);
    res.json((await select_canteen(id)).rows[0]);
});

canteen_router.get("/detail/:id(\\d+)", async (req, res) => {
    const id = Number(req.params["id"]);
    res.json((await select_canteen_detail(id)).rows[0]);
});