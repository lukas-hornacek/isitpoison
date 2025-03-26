import { useContext } from "react";
import { AuthenticationContext } from "../auth/AuthenticationContext";

export default function AdminReviewsView() {
    const auth = useContext(AuthenticationContext)!;

    if (!auth.isAdmin) {
        return (
            <h2>Chyba prístupu</h2>
        );
    }

    return (
        <h2>Recenzie</h2>    
    );
}