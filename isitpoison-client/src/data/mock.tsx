import { Weekday } from "../common";
import { Canteen, Meal } from "../types";

const canteens = [
    { id: 1, name: "Eat & Meet", location: "loc1" },
    { id: 2, name: "FreeFood", location: "loc2" },
    { id: 3, name: "FaynFood", location: "loc3" },
    { id: 4, name: "FiitFood", location: "loc4" },
];

const meals = [
    {
        id: 1,
        name: "Vajíčko",
        canteen_id: 1,
        last_served: new Date("2025-02-25"),
        uploaded: new Date("2025-02-25"),
    },
    {
        id: 2,
        name: "Kari",
        canteen_id: 1,
        last_served: new Date("2025-02-25"),
        uploaded: new Date("2025-02-25"),
    },
    {
        id: 3,
        name: "Zemiak",
        canteen_id: 1,
        last_served: new Date("2025-02-25"),
        uploaded: new Date("2025-02-25"),
    },
    {
        id: 4,
        name: "Hranolka",
        canteen_id: 3,
        last_served: new Date("2025-02-25"),
        uploaded: new Date("2025-02-25"),
    },
    {
        id: 5,
        name: "Ryža",
        canteen_id: 2,
        last_served: new Date("2025-02-25"),
        uploaded: new Date("2025-02-25"),
    },
    {
        id: 6,
        name: "Kaša",
        canteen_id: 3,
        last_served: new Date("2025-02-25"),
        uploaded: new Date("2025-02-25"),
    },
];

const ratings = [7, 4.5, 6, 2.1, 10, 1.7];

export function getCanteen(id: number): Canteen {
    return canteens[id];
}

export function getCanteens(): Canteen[] {
    return canteens;
}

// enum Sorting {
//     LastServed,
//     Uploaded,
//     Alphabetical,
//     Rating
// };

// sorting    : which parameter should be used to order the results
// descending : whether the results are ordered ascending or descending
// canteens   : which canteens to include in the results (empty is equal to all)
export function getAllMeals(): Meal[] {
    return meals;
}

export function getMealsForDay(weekday: Weekday): Meal[] {
    const weekly = new Map<Weekday, Set<number>>();
    weekly.set(Weekday.Monday, new Set([1, 2]));
    weekly.set(Weekday.Tuesday, new Set([3, 5, 1]));
    weekly.set(Weekday.Friday, new Set([1, 2, 3, 4, 5, 6]));

    return meals.filter(meal => weekly.get(weekday)?.has(meal.id));
}

export function getMeal(id: number): Meal {
    return meals[id];
}

export function getMealRating(id: number): number {
    return ratings[id - 1];
}