import useSWR, { mutate } from "swr";

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

export async function deleteReview(id: number, userId: number, mealId: number) {
    const res =  await fetch(`/api/review/${id}`, {
        method: "DELETE",
        credentials: "include"
    });

    if (res.ok) {
        mutate("/api/review");
        mutate(`/api/user/${userId}`);
        mutate(`/api/review/user/${userId}`);
        mutate(`/api/review/meal/${mealId}`);
    }

    return res.ok;
}

export async function addReview(mealId: number, userId: number, rating: number, text?: string) {
    const res =  await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meal_id: mealId, rating, text }),
        credentials: "include"
    });

    if (res.ok) {
        mutate("/api/review");
        mutate(`/api/user/${userId}`);
        mutate(`/api/review/user/${userId}`);
        mutate(`/api/review/meal/${mealId}`);
    }

    return res.ok;
}

export async function updateReview(id: number, mealId: number, userId: number, rating: number, text?: string) {
    const res =  await fetch(`/api/review/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meal_id: mealId, rating, text }),
        credentials: "include"
    });

    if (res.ok) {
        mutate("/api/review");
        mutate(`/api/review/user/${userId}`);
        mutate(`/api/review/meal/${mealId}`);
    }

    return res.ok;
}