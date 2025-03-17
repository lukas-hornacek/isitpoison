import express from "express";

export const canteen_router = express.Router();

const canteens = [
    { id: 1, name: "Eat & Meet" },
    { id: 2, name: "FreeFood" },
    { id: 3, name: "FaynFood" },
    { id: 4, name: "FiitFood" },
];

// get list of all canteens
canteen_router.get("/", async (_req, res) => {
    res.json(canteens);
});