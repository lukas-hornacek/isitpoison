export const url = "http://localhost:3000/api";

export const fetcher = (input: RequestInfo | URL, init: RequestInit | undefined) => fetch(input, init).then(res => res.json());