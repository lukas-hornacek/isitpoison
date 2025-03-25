import { useContext } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router";
import { Authentication, AuthenticationContext } from "../auth/AuthenticationContext";

export default function NavBar() {
    const auth: Authentication = useContext(AuthenticationContext)!;

    return (
        <Navbar expand="lg" className="bg-body-secondary">
            <Container>
                <Navbar.Brand href="/">Is it Poison?</Navbar.Brand>
                <NavLink to="/" end>Aktuálna ponuka</NavLink>
                <NavLink to="/meals">Všetky jedlá</NavLink>
                {auth.isAdmin ? <NavLink to="/admin">Administrácia</NavLink> : <NavLink to="/profile">Profil</NavLink>}
                <Button onClick={() => auth.isLoggedIn ? auth.logout() : auth.login()}>
                    {auth.isLoggedIn ? "Odhlásiť" : "Prihlásiť"}
                </Button>
            </Container>
        </Navbar>
    );
}