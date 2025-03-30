import useSWR from "swr";

import { fetcher } from "./fetcher";
import { Canteen } from "../types";

export function useGetCanteens(search?: string) {
    const { data, error, isLoading } = useSWR<Canteen[], Error>(`/api/canteen${search ? `?search=${search}` : ""}`, fetcher);

    return {
        canteens: data,
        isLoading: isLoading,
        error: error,
    };
}

export function useGetCanteen(id: number) {
    const { data, error, isLoading } = useSWR<Canteen, Error>(`/api/canteen/${id}`, fetcher);

    return {
        canteen: data,
        isLoading: isLoading,
        error: error,
    };
}