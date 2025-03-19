import useSWR from "swr";

import { url, fetcher } from "./fetcher";
import { Canteen, CanteenDetail } from "../types";

export function useGetCanteens() {
    const { data, error, isLoading } = useSWR<Canteen[], Error>(`${url}/canteen`, fetcher);

    return {
        canteens: data,
        isLoading: isLoading,
        error: error,
    };
}

export function useGetCanteen(id: number) {
    const { data, error, isLoading } = useSWR<Canteen, Error>(`${url}/canteen/${id}`, fetcher);

    return {
        canteen: data,
        isLoading: isLoading,
        error: error,
    };
}

export function useGetCanteenDetail(id: number) {
    const { data, error, isLoading } = useSWR<CanteenDetail, Error>(`${url}/canteen/detail/${id}`, fetcher);

    return {
        canteenDetail: data,
        isLoading: isLoading,
        error: error,
    };
}