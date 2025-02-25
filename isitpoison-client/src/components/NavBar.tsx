import { NavLink } from "react-router";

export default function NavBar() {
    return (
        <nav>
            <NavLink to="/" end>Aktuálne</NavLink>
            <NavLink to="/meals">Všetky</NavLink>
            <NavLink to="/profile">Profil</NavLink>
        </nav>
    );
}