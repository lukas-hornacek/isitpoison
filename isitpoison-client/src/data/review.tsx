import useSWR from "swr";

import { url, fetcher } from "./fetcher";
import { Review } from "../types";

export function useGetReviewsByMeal(id: number) {
    const { data, error, isLoading } = useSWR<Review[], Error>(`${url}/review/meal/${id}`, fetcher);

    return {
        reviews: data,
        isLoading: isLoading,
        error: error,
    };
}

export function useGetReviewsByUser(id: number) {
    const { data, error, isLoading } = useSWR<Review[], Error>(`${url}/review/user/${id}`, fetcher);

    return {
        reviews: data,
        isLoading: isLoading,
        error: error,
    };
}