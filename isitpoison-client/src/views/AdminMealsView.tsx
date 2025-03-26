import { useContext } from "react";
import { AuthenticationContext } from "../auth/AuthenticationContext";

export default function AdminMealsView() {
    const auth = useContext(AuthenticationContext)!;

    if (!auth.isAdmin) {
        return (
            <h2>Chyba prístupu</h2>
        );
    }
    
    return (
        <h2>Jedlá</h2>
    );
}