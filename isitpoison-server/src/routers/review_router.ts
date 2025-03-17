import express from "express";

export const review_router = express.Router();

const reviews = [
    {
        id: 1,
        meal_id: 1,
        user_id: 1,
        uploaded: new Date("2025-02-25"),
        rating: 5,
        text: "meh..."
    },
    {
        id: 2,
        meal_id: 1,
        user_id: 1,
        uploaded: new Date("2025-02-25"),
        rating: 10,
        text: "dokonalé"   
    }
];

review_router.get("/meal/:id(\\d+)", async (req, res) => {
    const id = Number(req.params["id"]);
    res.json(reviews[id - 1]);
});

review_router.get("/user/:id(\\d+)", async (req, res) => {
    const id = Number(req.params["id"]);
    res.json(reviews[id - 1]);
});