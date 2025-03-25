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

    login(): void {
        this.#setIsLoggedIn(true);
        this.#setUserId(1);
    };

    logout(): void {
        this.#setIsLoggedIn(false);
        this.#setUserId(undefined);
    }
}

export const AuthenticationContext = createContext<Authentication | undefined>(undefined);
