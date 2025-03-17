import express from "express";

export const user_router = express.Router();

const users = [
    {
        id: 1,
        username: "example user",
        joined: new Date("2025-02-25"),
        review_count: 2,
        is_admin: false,
    }
];

user_router.get("/:id(\\d+)", async (req, res) => {
    const id = Number(req.params["id"]);
    res.json(users[id - 1]);
});
