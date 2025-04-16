import { useContext, useState } from "react";
import { Authentication, AuthenticationContext } from "../auth/AuthenticationContext";
import { useNavigate } from "react-router";
import { Form, Button, Container, Stack } from "react-bootstrap";

export default function LoginView() {
    const auth: Authentication = useContext(AuthenticationContext)!;
    const navigate = useNavigate();

    // form fields
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [validated, setValidated] = useState(false);
    const [error, setError] = useState("");

    const submit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setValidated(true);

        if (username === "" || password.length < 10) {
            return;
        }
        try {
            await auth.login(username, password);
            if (auth.isAdmin) {
                navigate("/admin/reviews");
            } else {
                navigate("/");
            }
        } catch {
            setError("Prihlásenie bolo neúspešné");
            return;
        }
    };

    const register = async () => {
        setValidated(true);

        if (username === "" || password.length < 10) {
            return;
        }
        try {
            await auth.register(username, password);
            if (auth.isAdmin) {
                navigate("/admin/reviews");
            } else {
                navigate("/");
            }
        } catch {
            setError("Registrácia bola neúspešná");
            return;
        }
    };

    return (
        <Stack gap={2}>
            <Form noValidate onSubmit={submit}>
                <Container>
                    {error !== "" ? <div className="text-danger">{error}</div> : null}
                    <Form.Group>
                        <Form.Label>Meno</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            isValid={validated && username !== ""}
                            isInvalid={validated && username === ""}
                            onChange={(e) => setUsername(e.target.value)}
                            required />
                        <Form.Control.Feedback type="invalid">
                            Meno je povinné
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Heslo</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            isValid={validated && password.length >= 10}
                            isInvalid={validated && password.length < 10}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                        <Form.Control.Feedback type="invalid">
                            Heslo musí mať aspoň 10 znakov
                        </Form.Control.Feedback>
                    </Form.Group>
                </Container>
                <Container className="d-flex justify-content-end gap-2">
                    <Button type="submit" variant="success">Prihlásiť</Button>
                    <Button onClick={register}>Registrovať</Button>
                </Container>
            </Form>
        </Stack>
    );
}