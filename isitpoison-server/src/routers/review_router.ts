import express from "express";
import { delete_review, insert_review, select_review_by_meal, select_review_by_user, select_reviews, update_review } from "../queries/review_queries.js";

export const review_router = express.Router();

// TODO admin only
review_router.get("/", async (req, res) => {
    const search = req.query["search"]?.toString().toLowerCase();

    res.json((await select_reviews(search)).rows);
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

// TODO logged in user only
review_router.delete("/:id(\\d+)", async (req, res) => {
    const id = Number(req.params["id"]);
    
    try {
        const result = await delete_review(id);
        if (result.rowCount === 0) {
            res.status(400).send("review does not exist");
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
});

// TODO logged in user only
review_router.post("/", async (req, res) => {
    const review = req.body;

    if (typeof review["meal_id"] !== "number") {
        res.status(400).send("field 'meal_id' of type number is required");
        return;
    }
    if (typeof review["user_id"] !== "number") {
        res.status(400).send("field 'user_id' of type number is required");
        return;
    }
    if (typeof review["rating"] !== "number") {
        res.status(400).send("field 'rating' of type number is required");
        return;
    }
    if (review["text"] !== undefined && typeof review["text"] !== "string") {
        res.status(400).send("field 'text' must be a string");
        return;
    }

    try {
        await insert_review(review["meal_id"], review["user_id"], review["rating"], review["text"]);
        res.send();
    } catch (e: unknown) {
        if (e instanceof Error) {
            if (e.message.includes("duplicate key")) {
                res.status(400).send("review already exists.");
            } else if (e.message.includes("reviews_rating_check1")) {
                res.status(400).send("rating must be between 1 and 5");
            } else if (e.message.includes("reviews_meal_id_fkey")) {
                res.status(400).send(`meal with ID ${review["meal_id"]} does not exist`);
            } else if (e.message.includes("reviews_user_id_fkey")) {
                res.status(400).send(`user with ID ${review["user_id"]} does not exist`);
            } else {
                res.status(400).send(e.message);
            }
        } else {
            res.status(500).send("unknown error");
        }
    }
});

// TODO logged in user only
review_router.put("/:id(\\d+)", async (req, res) => {
    const id = Number(req.params["id"]);
    const review = req.body;

    if (typeof review["meal_id"] !== "number") {
        res.status(400).send("field 'meal_id' is missing or of wrong type");
        return;
    }
    if (typeof review["user_id"] !== "number") {
        res.status(400).send("field 'user_id' is missing or of wrong type");
        return;
    }
    if (typeof review["rating"] !== "number") {
        res.status(400).send("field 'rating' is missing or of wrong type");
        return;
    }
    if (review["text"] !== undefined && typeof review["text"] !== "string") {
        res.status(400).send("field 'text' is of wrong type");
        return;
    }

    try {
        const result = await update_review(id, review["rating"], review["text"]);
        if (result.rowCount === 0) {
            res.status(400).send("review does not exist");
        } else {
            res.send();
        }
    } catch (e: unknown) {
        if (e instanceof Error) {
            if (e.message.includes("reviews_rating_check1")) {
                res.status(400).send("rating must be between 1 and 5");
            } else if (e.message.includes("reviews_meal_id_fkey")) {
                res.status(400).send(`meal with ID ${review["meal_id"]} does not exist`);
            } else if (e.message.includes("reviews_user_id_fkey")) {
                res.status(400).send(`user with ID ${review["user_id"]} does not exist`);
            } else {
                res.status(400).send(e.message);
            }
        } else {
            res.status(500).send("unknown error");
        }
    }
});