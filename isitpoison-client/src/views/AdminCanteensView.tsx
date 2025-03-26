import { useContext } from "react";
import { AuthenticationContext } from "../auth/AuthenticationContext";

export default function AdminCanteensView() {
    const auth = useContext(AuthenticationContext)!;

    if (!auth.isAdmin) {
        return (
            <h2>Chyba prístupu</h2>
        );
    }

    return (
        <h2>Používatelia</h2>
    );
}
