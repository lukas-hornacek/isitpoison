import useSWR, { mutate } from "swr";

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

export async function deleteCanteen(id: number) {
    const res =  await fetch(`/api/canteen/${id}`, {
        method: "DELETE",
        credentials: "include"
    });

    if (res.ok) {
        mutate("/api/canteen");
    }

    return res.ok;
}

export async function addCanteen(name: string, location: string, monday_open?: string, monday_close?: string,
    tuesday_open?: string, tuesday_close?: string, wednesday_open?: string, wednesday_close?: string,
    thursday_open?: string, thursday_close?: string, friday_open?: string, friday_close?: string,
    saturday_open?: string, saturday_close?: string, sunday_open?: string, sunday_close?: string) {
    const res =  await fetch("/api/canteen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, location, monday_open, monday_close, tuesday_open, tuesday_close,
            wednesday_open, wednesday_close, thursday_open, thursday_close, friday_open,
            friday_close, saturday_open, saturday_close, sunday_open, sunday_close }),
        credentials: "include"
    });

    if (res.ok) {
        mutate("/api/canteen");
    }

    return res.ok;
}

export async function updateCanteen(id: number, name: string, location: string, monday_open?: string, monday_close?: string,
    tuesday_open?: string, tuesday_close?: string, wednesday_open?: string, wednesday_close?: string,
    thursday_open?: string, thursday_close?: string, friday_open?: string, friday_close?: string,
    saturday_open?: string, saturday_close?: string, sunday_open?: string, sunday_close?: string) {
    const res =  await fetch(`/api/canteen/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, location, monday_open, monday_close, tuesday_open, tuesday_close,
            wednesday_open, wednesday_close, thursday_open, thursday_close, friday_open,
            friday_close, saturday_open, saturday_close, sunday_open, sunday_close }),
        credentials: "include"
    });

    if (res.ok) {
        mutate("/api/canteen");
    }

    return res.ok;
}