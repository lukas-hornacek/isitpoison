import { useContext, useState } from "react";
import { AuthenticationContext } from "../auth/AuthenticationContext";
import { useGetCanteens } from "../data/canteen";
import { Button, ButtonToolbar, Col, Container, Form, InputGroup, ListGroup, ListGroupItem, Row, Spinner } from "react-bootstrap";
import { Canteen } from "../types";
import CanteenDetail from "../components/CanteenDetail";

export default function AdminCanteensView() {
    const auth = useContext(AuthenticationContext)!;

    const [searchText, setSearchText] = useState("");
    const [finalText, setFinalText] = useState("");

    const { canteens, isLoading } = useGetCanteens(finalText);

    if (!auth.isAdmin) {
        return (
            <h2>Chyba prístupu</h2>
        );
    }

    if (isLoading) {
        return <Spinner />;
    }

    const canteenItems = canteens?.map(canteen => <AdminCanteenItem canteen={canteen}/>);

    return (
        <Container>
            <h2>Jedálne</h2>
            <ButtonToolbar className="d-flex justify-content-center">
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="Zadaj názov jedálne"
                        aria-label="Názov jedálne"
                        onChange={(event) => setSearchText(event.target.value)}
                        value={searchText}
                    />
                    <Button variant="success" onClick={() => setFinalText(searchText)}>Vyhľadaj</Button>
                </InputGroup>
            </ButtonToolbar>

            <ListGroup>{canteenItems}</ListGroup>
        </Container>
    );
}

function AdminCanteenItem({ canteen }: { canteen: Canteen }) {
    return (
        <ListGroupItem key={canteen.id} variant="dark">
            <Row>
                <Col>
                    <h4>{canteen.name}</h4>
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button variant="danger">Odstrániť</Button>
                </Col>
            </Row>
            <CanteenDetail id={canteen.id} />
        </ListGroupItem>
    );
}