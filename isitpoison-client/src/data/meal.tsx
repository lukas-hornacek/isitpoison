import useSWR from "swr";

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