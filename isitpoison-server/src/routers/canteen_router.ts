import express from "express";

export const canteen_router = express.Router();

const canteens = [
    { id: 1, name: "Eat & Meet" },
    { id: 2, name: "FreeFood" },
    { id: 3, name: "FaynFood" },
    { id: 4, name: "FiitFood" },
];

const canteen_details = [
    { 
        location: "location 1",
        monday_open: "7:00",
        monday_close: "20:30",
        tuesday_open: "7:00",
        tuesday_close: "20:30",
        wednesday_open: "7:00",
        wednesday_close: "20:30",
        thursday_open: "7:00",
        thursday_close: "20:30",
        friday_open: "7:00",
        friday_close: "20:30",
        saturday_open: "9:00",
        saturday_close: "19:00",
        sunday_open: "9:00",
        sunday_close: "19:00",
    },
    {
        location: "location 2",
        monday_open: "7:30",
        monday_close: "15:00",
        tuesday_open: "7:30",
        tuesday_close: "15:00",
        wednesday_open: "7:30",
        wednesday_close: "15:00",
        thursday_open: "7:30",
        thursday_close: "15:00",
        friday_open: "7:30",
        friday_close: "15:00",
        saturday_open: undefined,
        saturday_close: undefined,
        sunday_open: undefined,
        sunday_close: undefined,
    },
    {
        location: "location 3",
        monday_open: "7:30",
        monday_close: "15:00",
        tuesday_open: "7:30",
        tuesday_close: "15:00",
        wednesday_open: "7:30",
        wednesday_close: "15:00",
        thursday_open: "7:30",
        thursday_close: "15:00",
        friday_open: "7:30",
        friday_close: "15:00",
        saturday_open: undefined,
        saturday_close: undefined,
        sunday_open: undefined,
        sunday_close: undefined,
    },
    {
        location: "location 4",
        monday_open: "7:30",
        monday_close: "15:00",
        tuesday_open: "7:30",
        tuesday_close: "15:00",
        wednesday_open: "7:30",
        wednesday_close: "15:00",
        thursday_open: "7:30",
        thursday_close: "15:00",
        friday_open: "7:30",
        friday_close: "15:00",
        saturday_open: undefined,
        saturday_close: undefined,
        sunday_open: undefined,
        sunday_close: undefined,
    }
];

// get list of all canteens
canteen_router.get("/", async (_req, res) => {
    res.json(canteens);
});

canteen_router.get("/:id(\\d+)", async (req, res) => {
    const id = Number(req.params["id"]);
    res.json(canteens[id - 1]);
});

canteen_router.get("/detail/:id(\\d+)", async (req, res) => {
    const id = Number(req.params["id"]);
    res.json(canteen_details[id - 1]);
});