import useSWR from "swr";

import { fetcher } from "./fetcher";
import { Review } from "../types";

export function useGetReviews(search?: string) {
    const { data, error, isLoading } = useSWR<Review[], Error>(`/api/review${search ? `?search=${search}` : ""}`, fetcher);

    return {
        reviews: data,
        isLoading: isLoading,
        error: error,
    };
}

export function useGetReviewsByMeal(id: number) {
    const { data, error, isLoading } = useSWR<Review[], Error>(`/api/review/meal/${id}`, fetcher);

    return {
        reviews: data,
        isLoading: isLoading,
        error: error,
    };
}

export function useGetReviewsByUser(id?: number) {
    const { data, error, isLoading } = useSWR<Review[], Error>(id ? `/api/review/user/${id}` : null, fetcher);

    return {
        reviews: data,
        isLoading: isLoading,
        error: error,
    };
}