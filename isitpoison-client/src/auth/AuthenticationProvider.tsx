import { useEffect, useState } from "react";
import { AuthenticationContext, Authentication } from "./AuthenticationContext";

export default function AuthenticationProvider({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userId, setUserId] = useState<number | undefined>();

    useEffect(() => {
        fetch("/api/auth/status", {
            method: "GET",
            credentials: "include",
        }).then(async (res) => {
            if (res.ok) {
                const data = await res.json();
                setIsLoggedIn(true);
                setIsAdmin(data.isAdmin);
                setUserId(data.userId);
            }
        });
    }, []);

    return (
        <AuthenticationContext.Provider value={new Authentication(isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin, userId, setUserId)}>
            {children}
        </AuthenticationContext.Provider>
    );
}