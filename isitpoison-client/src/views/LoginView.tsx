import { useContext, useState } from "react";
import { Authentication, AuthenticationContext } from "../auth/AuthenticationContext";
import { useNavigate } from "react-router";
import { Form, Button } from "react-bootstrap";

export default function LoginView() {
    const auth: Authentication = useContext(AuthenticationContext)!;
    const navigate = useNavigate();

    // form fields
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await auth.login(username, password);
            if (auth.isAdmin) {
                navigate("/admin/reviews");
            } else {
                navigate("/");
            }
        } catch {
            return;
        }
    };

    return (
        <Form onSubmit={submit}>
            <Form.Group>
                <Form.Label>Meno</Form.Label>
                <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Heslo</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="d-flex justify-content-end">
                <Button type="submit">Prihlásiť</Button>
            </Form.Group>
        </Form>
    );
}