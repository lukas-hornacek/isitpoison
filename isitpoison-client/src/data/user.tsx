import useSWR from "swr";

import { url, fetcher } from "./fetcher";
import { User } from "../types";

export function useGetUser(id: number) {
    const { data, error, isLoading } = useSWR<User, Error>(`${url}/user/${id}`, fetcher);
    
    return {
        user: data,
        isLoading: isLoading,
        error: error,
    };
}