import { createContext } from "react";

export class Authentication {
    #isLoggedIn: boolean;
    #isAdmin: boolean;
    #userId: number | undefined;

    #setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    #setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
    #setUserId: React.Dispatch<React.SetStateAction<number | undefined>>;

    constructor(isLoggedIn: boolean, setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
            isAdmin: boolean, setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>,
            userId: number | undefined, setUserId: React.Dispatch<React.SetStateAction<number | undefined>>) {
        this.#isLoggedIn = isLoggedIn;
        this.#isAdmin = isAdmin;
        this.#setIsLoggedIn = setIsLoggedIn;
        this.#setIsAdmin = setIsAdmin;
        this.#userId = userId;
        this.#setUserId = setUserId;
    }

    get isLoggedIn(): boolean {
        return this.#isLoggedIn;
    }

    get isAdmin(): boolean {
        return this.#isAdmin;
    }

    get userId(): number | undefined {
        return this.#userId;
    }

    async login(username: string, password: string): Promise<void> {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
            credentials: "include"
        });

        if (response.ok) {
            const body = await response.json();

            this.#isLoggedIn = true;
            this.#userId = body["userId"];
            this.#isAdmin = body["isAdmin"];

            this.#setIsLoggedIn(true);
            this.#setUserId(body["userId"]);
            this.#setIsAdmin(body["isAdmin"]);
        } else {
            // invalid password or user does not exist
            if (response.status === 401) {
              throw new Error("Invalid credentials"); 
            }
            throw new Error("Error logging in");
        }
    };

    async logout(): Promise<void> {
        const response = await fetch("/api/auth/logout", {
            method: "DELETE",
            credentials: "include"
        });

        if (response.ok) {
            this.#isLoggedIn = false;
            this.#userId = undefined;
            this.#isAdmin = false;

            this.#setIsLoggedIn(false);
            this.#setUserId(undefined);
            this.#setIsAdmin(false);
        } else {
            if (response.status === 400) {
              throw new Error("Session does not exist."); 
            }
            throw new Error("Error logging out");
        }
    }
}

export const AuthenticationContext = createContext<Authentication | undefined>(undefined);
