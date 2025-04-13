import useSWR, { mutate } from "swr";

import { fetcher } from "./fetcher";
import { Meal } from "../types";
import { Ordering, Weekday } from "../common";

export function useGetMeal(id: number) {
    const { data, error, isLoading } = useSWR<Meal, Error>(`/api/meal/${id}`, fetcher);

    return {
        meal: data,
        isLoading: isLoading,
        error: error,
    };
}

export function useGetWeeklyMeals(canteen_id: number, weekday: Weekday) {
    const { data, error, isLoading } = useSWR<Meal[], Error>(`/api/meal/${canteen_id}/${weekday}`, fetcher);

    return {
        meals: data,
        isLoading: isLoading,
        error: error
    };
}

export function useGetMeals(canteen_ids?: number[], ordering?: Ordering, search?: string) {
    const args: string[] = [];

    if (canteen_ids !== undefined) {
        args.push("canteens=" + JSON.stringify(canteen_ids));
    }
    if (ordering !== undefined) {
        args.push("ordering=" + ordering);
    }
    if (search !== undefined) {
        args.push("search=" + search);
    }

    const { data, error, isLoading } = useSWR<Meal[], Error>(
        `/api/meal${args.length === 0 ? "" : "?" + args.join("&")}`, fetcher);

    return {
        meals: data,
        isLoading: isLoading,
        error: error
    };
}

export async function deleteMeal(id: number) {
    const res =  await fetch(`/api/meal/${id}`, {
        method: "DELETE",
        credentials: "include"
    });

    if (res.ok) {
        mutate("/api/meal");
    }

    return res.ok;
}

export async function addMeal(name: string, canteenId: number) {
    const res =  await fetch("/api/meal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, canteen_id: canteenId }),
        credentials: "include"
    });

    if (res.ok) {
        mutate("/api/meal");
    }

    return res.ok;
}

export async function updateMeal(id: number, name: string, canteenId: number) {
    const res =  await fetch(`/api/meal/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, canteen_id: canteenId }),
        credentials: "include"
    });

    if (res.ok) {
        mutate("/api/meal");
    }

    return res.ok;
}