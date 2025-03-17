import express from "express";

export const meal_router = express.Router();

const meals = [
    {
        id: 1,
        name: "Vajíčko",
        canteen_id: 1,
        last_served: new Date("2025-02-25"),
        uploaded: new Date("2025-02-25"),
        rating: 7,
    },
    {
        id: 2,
        name: "Kari",
        canteen_id: 1,
        last_served: new Date("2025-02-25"),
        uploaded: new Date("2025-02-25"),
        rating: 4.5,
    },
    {
        id: 3,
        name: "Zemiak",
        canteen_id: 1,
        last_served: new Date("2025-02-25"),
        uploaded: new Date("2025-02-25"),
        rating: 6,
    },
    {
        id: 4,
        name: "Hranolka",
        canteen_id: 3,
        last_served: new Date("2025-02-25"),
        uploaded: new Date("2025-02-25"),
        rating: 2.1,
    },
    {
        id: 5,
        name: "Ryža",
        canteen_id: 2,
        last_served: new Date("2025-02-25"),
        uploaded: new Date("2025-02-25"),
        rating: 10,
    },
    {
        id: 6,
        name: "Kaša",
        canteen_id: 3,
        last_served: new Date("2025-02-25"),
        uploaded: new Date("2025-02-25"),
        rating: 1.7,
    },
];

meal_router.get("/:canteen_id(\\d+)/:weekday(\\d+)", async (req, res) => {
    const canteen_id = Number(req.params["canteen_id"]);
    const weekday = Number(req.params["weekday"]);

    res.json([meals[weekday - 1], meals[canteen_id - 1]]);
});

meal_router.get("/:id(\\d+)", async (req, res) => {
    const id = Number(req.params["id"]);
    res.json(meals[id - 1]);
});

// TODO parses filters from query
meal_router.get("/", async (_req, res) => {
    res.json(meals);
});