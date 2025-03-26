import { useContext, useState } from "react";
import { AuthenticationContext } from "../auth/AuthenticationContext";
import { Button, ButtonToolbar, Col, Container, Form, InputGroup, ListGroup, ListGroupItem, Row, Spinner } from "react-bootstrap";
import { useGetUsers } from "../data/user";
import { User } from "../types";

export default function AdminUsersView() {
    const auth = useContext(AuthenticationContext)!;

    const [searchText, setSearchText] = useState("");
    const [finalText, setFinalText] = useState("");

    const { users, isLoading } = useGetUsers(finalText);
    
    if (!auth.isAdmin) {
        return (
            <h2>Chyba prístupu</h2>
        );
    }

    if (isLoading) {
        return <Spinner />;
    }

    const userItems = users?.map(user => <AdminUserItem user={user}/>);

    return (
        <Container>
            <h2>Používatelia</h2>
            <ButtonToolbar className="d-flex justify-content-center">
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="Zadaj meno používateľa"
                        aria-label="Meno používateľa"
                        onChange={(event) => setSearchText(event.target.value)}
                        value={searchText}
                    />
                    <Button variant="success" onClick={() => setFinalText(searchText)}>Vyhľadaj</Button>
                </InputGroup>
            </ButtonToolbar>

            <ListGroup>
                {userItems}
            </ListGroup>
        </Container>
    );
}

function AdminUserItem({ user }: { user: User }) {
    return (
        <ListGroupItem key={user.id} variant="dark">
            <Row>
                <Col>
                    <h4>{user.username}</h4>
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button variant="danger">Odstrániť</Button>
                </Col>
            </Row>
            Používateľom od {user.joined.toString()} <br></br>
            Počet recenzií: {user.reviews}
        </ListGroupItem>
    );
}