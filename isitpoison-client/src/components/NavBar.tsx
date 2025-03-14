import { NavLink } from "react-router";

export default function NavBar() {
    return (
        <nav>
            <NavLink to="/" end>Aktuálna ponuka</NavLink>
            <NavLink to="/meals">Všetky jedlá</NavLink>
            <NavLink to="/profile">Profil</NavLink>
        </nav>
    );
}