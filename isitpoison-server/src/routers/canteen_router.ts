import express from "express";
import { delete_canteen, insert_canteen, select_canteen, select_canteens, update_canteen } from "../queries/canteen_queries.js";

const hours = [
    "monday_open", "monday_close", "tuesday_open", "tuesday_close",
    "wednesday_open", "wednesday_close", "thursday_open", "thursday_close",
    "friday_open", "friday_close", "saturday_open", "saturday_close",
    "sunday_open", "sunday_close",
];

export const canteen_router = express.Router();

canteen_router.get("/", async (req, res) => {
    const search = req.query["search"]?.toString().toLowerCase();

    res.json((await select_canteens(search)).rows);
});

canteen_router.get("/:id(\\d+)", async (req, res) => {
    const id = Number(req.params["id"]);

    const result = await select_canteen(id);

    if (result.rowCount === 0) {
        res.status(404).send("canteen not found.");
    } else {
        res.json(result.rows[0]);
    }
});

// TODO admin only
canteen_router.delete("/:id(\\d+)", async (req, res) => {
    const id = Number(req.params["id"]);
    
    try {
        const result = await delete_canteen(id);
        if (result.rowCount === 0) {
            res.status(400).send("canteen does not exist");
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

// TODO admin only
canteen_router.post("/", async (req, res) => {
    const canteen = req.body;

    if (typeof canteen["name"] !== "string") {
        res.status(400).send("field 'name' of type string is required");
        return;
    }
    if (typeof canteen["location"] !== "string") {
        res.status(400).send("field 'location' of type string is required");
        return;
    }
    for (const hour of hours) {
        if (typeof canteen[hour] !== "string") {
            res.status(400).send(`field '${hour}' of type string in HH:MM format is required`);
            return;
        }
        if (!/^([01][0-9]|2[0-3]):([0-5][0-9])$/.test(canteen[hour])) {
            res.status(400).send(`field '${hour}' must be in HH:MM format`);
            return;
        }
    }

    try {
        await insert_canteen(canteen["name"], canteen["location"], canteen["monday_open"], canteen["monday_close"],
            canteen["tuesday_open"], canteen["tuesday_close"], canteen["wednesday_open"], canteen["wednesday_close"],
            canteen["thursday_open"], canteen["thursday_close"], canteen["friday_open"], canteen["friday_close"],
            canteen["saturday_open"], canteen["saturday_close"], canteen["sunday_open"], canteen["sunday_close"]);
        res.send();
    } catch (e: unknown) {
        if (e instanceof Error) {
            if (e.message.includes("duplicate key")) {
                res.status(400).send("canteen already exists.");
            } else {
                res.status(400).send(e.message);
            }
        } else {
            res.status(500).send("unknown error");
        }
    }
});

// TODO admin only
canteen_router.put("/:id(\\d+)", async (req, res) => {
    const id = Number(req.params["id"]);
    const canteen = req.body;

    if (typeof canteen["name"] !== "string") {
        res.status(400).send("field 'name' of type string is required");
        return;
    }
    if (typeof canteen["location"] !== "string") {
        res.status(400).send("field 'location' of type string is required");
        return;
    }
    for (const hour of hours) {
        if (typeof canteen[hour] !== "string") {
            res.status(400).send(`field '${hour}' of type string in HH:MM format is required`);
            return;
        }
        if (!/^([01][0-9]|2[0-3]):([0-5][0-9])$/.test(canteen[hour])) {
            res.status(400).send(`field '${hour}' must be in HH:MM format'`);
            return;
        }
    }

    try {
        const result = await update_canteen(id, canteen["name"], canteen["location"], canteen["monday_open"], canteen["monday_close"],
            canteen["tuesday_open"], canteen["tuesday_close"], canteen["wednesday_open"], canteen["wednesday_close"],
            canteen["thursday_open"], canteen["thursday_close"], canteen["friday_open"], canteen["friday_close"],
            canteen["saturday_open"], canteen["saturday_close"], canteen["sunday_open"], canteen["sunday_close"]);
        if (result.rowCount === 0) {
            res.status(400).send("canteen does not exist");
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
