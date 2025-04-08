import Container from "react-bootstrap/Container";

import { useGetMeals } from "../data/meal";
import { Button, ButtonGroup, ButtonToolbar, Col, Form, InputGroup, ListGroup, ListGroupItem, Row, Spinner } from "react-bootstrap";
import { useContext, useState } from "react";
import { Ordering } from "../common";
import { AuthenticationContext } from "../auth/AuthenticationContext";
import RatingDisplay from "../components/RatingDisplay";
import { Meal } from "../types";
import { useGetCanteen, useGetCanteens } from "../data/canteen";

export interface Filters {
    canteen_ids?: number[],
    ordering?: Ordering,
    substring?: string,
}

export default function AdminMealsView() {
    const auth = useContext(AuthenticationContext)!;

    const [searchText, setSearchText] = useState("");
    const [finalText, setFinalText] = useState<string | undefined>(); 
    const [isAddingMeal, setIsAddingMeal] = useState(false);

    const { meals, isLoading } = useGetMeals(undefined, undefined, finalText);

    if (!auth.isAdmin) {
        return (
            <h2>Chyba prístupu</h2>
        );
    }

    if (isLoading) {
        return <Spinner />;
    }

    const mealItems = meals!.map(meal => <AdminMealItem key={meal.id} meal={meal} />);

    const weeklyScript = async () => {
        await fetch("/api/meal/update/weekly", {
            method: "POST",
            credentials: "include"
        });
    };

    const dailyScript = async () => {
        await fetch("/api/meal/update/daily", {
            method: "POST",
            credentials: "include"
        });
    };

    return (
        <Container>
            <h2>Jedlá</h2>
            <ButtonGroup>
                <Button onClick={weeklyScript}>Týždenné zmeny</Button>
                <Button onClick={dailyScript}>Denné zmeny</Button>
            </ButtonGroup>
            {isAddingMeal ? <AdminAddMeal setIsAddingMeal={setIsAddingMeal} /> : null}

            <ButtonToolbar className="d-flex justify-content-center">
                {isAddingMeal ? null : <Button onClick={() => setIsAddingMeal(true)}>Pridať jedlo</Button>}
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="Zadaj názov jedla"
                        aria-label="Názov jedla"
                        onChange={(event) => setSearchText(event.target.value)}
                        value={searchText}
                    />
                    <Button variant="success" onClick={() => setFinalText(searchText)}>Vyhľadaj</Button>
                </InputGroup>
            </ButtonToolbar>

            <ListGroup>{mealItems}</ListGroup>
        </Container>
    );
}

function AdminMealItem({ meal }: { meal: Meal }) {
    const { canteen, isLoading } = useGetCanteen(meal.canteen_id);

    return (
        <ListGroupItem key={meal.id} variant="dark">
            <Row>
                <Col><h4>{meal.name}</h4></Col>
                <Col>Jedáleň: {isLoading ? <Spinner /> : canteen!.name}</Col>
                <Col>Naposledy podávané: {meal.last_served}</Col>
                <Col className="d-flex justify-content-end"><Button variant="danger">Odstrániť</Button></Col>
            </Row>
            <RatingDisplay rating={Number(meal.rating)} precision={2} />
        </ListGroupItem>
    );
}

function AdminAddMeal({ setIsAddingMeal }: { setIsAddingMeal: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { canteens, isLoading } = useGetCanteens();

    // form fields
    const [canteen, setCanteen] = useState(1);
    const [name, setName] = useState("");

    if (isLoading) {
        return <Spinner />;
    }

    const submit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsAddingMeal(false);
    };

    return (
        <Form onSubmit={submit}>
            <Form.Group>
                <Form.Label>Názov</Form.Label>
                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Jedáleň</Form.Label>
                <Form.Select value={canteen} onChange={(e) => setCanteen(Number(e.target.value))}>
                    {canteens?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </Form.Select>
            </Form.Group>
            <Form.Group className="d-flex justify-content-center">
                <Button type="submit">Pridať</Button>
                <Button onClick={() => setIsAddingMeal(false)} variant="danger">Zrušiť</Button>
            </Form.Group>
        </Form>
    );
}