import useSWR from "swr";

import { fetcher } from "./fetcher";
import { User } from "../types";

export function useGetUsers(search?: string) {
    const { data, error, isLoading } = useSWR<User[], Error>(`/api/user${search ? `?search=${search}` : ""}`, fetcher);

    return {
        users: data,
        isLoading: isLoading,
        error: error,
    };
}

export function useGetUser(id?: number) {
    const { data, error, isLoading } = useSWR<User, Error>(id ? `/api/user/${id}` : null, fetcher);
    
    return {
        user: data,
        isLoading: isLoading,
        error: error,
    };
}