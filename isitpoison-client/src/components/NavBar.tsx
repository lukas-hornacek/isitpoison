import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router';

export default function NavBar() {
    return (
        <Navbar expand="lg" className="bg-body-secondary">
            <Container>
                <Navbar.Brand href="/">Is it Poison?</Navbar.Brand>
                <NavLink to="/" end>Aktuálna ponuka</NavLink>
                <NavLink to="/meals">Všetky jedlá</NavLink>
                <NavLink to="/profile">Profil</NavLink>
            </Container>
        </Navbar>
    );
}