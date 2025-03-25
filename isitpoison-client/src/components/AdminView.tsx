import { useContext } from "react";
import { Authentication, AuthenticationContext } from "../auth/AuthenticationContext";

export default function ProfileView() {
    const auth: Authentication = useContext(AuthenticationContext)!;

    if (auth.isLoggedIn && auth.isAdmin) {
        return (
            <h2>Administrácia</h2>
        );
    } else {
        return (
            <h2>Chyba prístupu</h2>
        );
    }
}