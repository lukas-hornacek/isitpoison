import { useContext } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router";
import { Authentication, AuthenticationContext } from "../auth/AuthenticationContext";

export default function NavBar() {
    const auth: Authentication = useContext(AuthenticationContext)!;

    const navigate = useNavigate();

    const logout = async () => {
        try {
            await auth.logout();
            navigate("/");
        } catch {
            console.log("Logout error");
        }
    };

    if (auth.isAdmin) {
        return (
            <Navbar expand="lg" className="bg-body-secondary">
                <Container>
                    <Navbar.Brand href="/">Is it Poison?</Navbar.Brand>
                    <NavLink to="/admin/meals">Jedlá</NavLink>
                    <NavLink to="/admin/canteens">Jedálne</NavLink>
                    <NavLink to="/admin/users">Používatelia</NavLink>
                    <NavLink to="/admin/reviews">Recenzie</NavLink>
                    <Button onClick={() => auth.isLoggedIn ? logout() : navigate("/login")}>
                        {auth.isLoggedIn ? "Odhlásiť" : "Prihlásiť"}
                    </Button>
                </Container>
            </Navbar>
        );
    } else {
        return (
            <Navbar expand="lg" className="bg-body-secondary">
                <Container>
                    <Navbar.Brand href="/">Is it Poison?</Navbar.Brand>
                    <NavLink to="/" end>Aktuálna ponuka</NavLink>
                    <NavLink to="/meals">Jedlá</NavLink>
                    <NavLink to="/profile">Profil</NavLink>
                    <Button onClick={() => auth.isLoggedIn ? logout() : navigate("/login")}>
                        {auth.isLoggedIn ? "Odhlásiť" : "Prihlásiť"}
                    </Button>
                </Container>
            </Navbar>
        );
    }
}