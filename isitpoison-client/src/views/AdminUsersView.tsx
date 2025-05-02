import { useContext, useState } from "react";
import { AuthenticationContext } from "../auth/AuthenticationContext";
import { Button, ButtonToolbar, Col, Container, Form, InputGroup, ListGroup, ListGroupItem, Row, Spinner, Stack } from "react-bootstrap";
import { deleteUser, useGetUsers } from "../data/user";
import { User } from "../types";
import { dateToString } from "../common";

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

    const userItems = users?.map(user => <AdminUserItem key={user.id} user={user}/>);

    return (
        <Container>
        <Stack gap={2}>
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
        </Stack>
        </Container>
    );
}

function AdminUserItem({ user }: { user: User }) {
    const remove = async () => {
        await deleteUser(user.id);
    };

    return (
        <ListGroupItem key={user.id} variant="dark">
            <Row className="align-items-start">
                <Col>
                    <h4>{user.username}</h4>
                </Col>
                <Col className="d-flex justify-content-end gap-2">
                    <Button variant="danger" onClick={remove}>Odstrániť</Button>
                </Col>
            </Row>
            <p>Používateľom od {dateToString(user.joined.toString())}</p>
            <p>{user.is_admin ? null : `Počet recenzií: ${user.reviews}`}</p>
        </ListGroupItem>
    );
}