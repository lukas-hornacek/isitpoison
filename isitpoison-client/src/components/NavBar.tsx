import { useContext } from "react";
import { Button, Nav } from "react-bootstrap";
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
                    <Navbar.Brand href="/" >Is it Poison?</Navbar.Brand>
                    <Navbar.Toggle />

                    <Navbar.Collapse>
                        <Nav className="d-flex flex-column flex-lg-row flex-grow-1">
                            <NavLink to="/admin/meals" className="nav-link flex-fill text-center">Jedlá</NavLink>
                            <NavLink to="/admin/canteens" className="nav-link flex-fill text-center">Jedálne</NavLink>
                            <NavLink to="/admin/users" className="nav-link flex-fill text-center">Používatelia</NavLink>
                            <NavLink to="/admin/reviews" className="nav-link flex-fill text-center">Recenzie</NavLink>
                        </Nav>
                    
                        <div className="d-flex justify-content-center">
                            <Button className="m-2" onClick={() => auth.isLoggedIn ? logout() : navigate("/login")}>
                                {auth.isLoggedIn ? "Odhlásiť" : "Prihlásiť"}
                            </Button>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    } else {
        return (
            <Navbar expand="lg" className="bg-body-secondary">
                <Container>
                    <Navbar.Brand href="/">Is it Poison?</Navbar.Brand>
                    <Navbar.Toggle />

                    <Navbar.Collapse>
                        <Nav className="d-flex flex-column flex-lg-row flex-grow-1">
                            <NavLink to="/" end className="nav-link flex-fill text-center">Aktuálna ponuka</NavLink>
                            <NavLink to="/meals" className="nav-link flex-fill text-center">Jedlá</NavLink>
                            <NavLink to="/profile" className="nav-link flex-fill text-center">Profil</NavLink>
                        </Nav>

                    <div className="d-flex justify-content-center">
                        <Button className="m-2" onClick={() => auth.isLoggedIn ? logout() : navigate("/login")}>
                            {auth.isLoggedIn ? "Odhlásiť" : "Prihlásiť"}
                        </Button>
                    </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}