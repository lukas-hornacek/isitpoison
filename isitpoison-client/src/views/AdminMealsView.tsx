import Container from "react-bootstrap/Container";

import { addMeal, deleteMeal, updateMeal, useGetMeals } from "../data/meal";
import { Button, ButtonToolbar, Col, Form, InputGroup, ListGroup, ListGroupItem, Row, Spinner, Stack } from "react-bootstrap";
import { useContext, useState } from "react";
import { Ordering } from "../common";
import { AuthenticationContext } from "../auth/AuthenticationContext";
import RatingDisplay from "../components/RatingDisplay";
import { Meal } from "../types";
import { useGetCanteens } from "../data/canteen";

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
    // if is adding or editing meal, prevent from other mutation at the same time
    const [isMutating, setIsMutating] = useState(false);

    const { meals, isLoading } = useGetMeals(undefined, undefined, finalText);

    if (!auth.isAdmin) {
        return (
            <h2>Chyba prístupu</h2>
        );
    }

    if (isLoading) {
        return <Spinner />;
    }

    const setAdding = (b: boolean) => {
        setIsAddingMeal(b);
        setIsMutating(b);
    };

    const mealItems = meals!.map(meal => <AdminMealItem key={meal.id} meal={meal}
        isMutating={isMutating} setIsMutating={setIsMutating} />);

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
        <Stack gap={2}>
            <h2>Jedlá</h2>
            <ButtonToolbar className="d-flex justify-content-center gap-2">
                <Button onClick={weeklyScript}>Týždenné zmeny</Button>
                <Button onClick={dailyScript}>Denné zmeny</Button>
                {isAddingMeal ? null : <Button onClick={() => setAdding(true)} disabled={isMutating}>Pridať jedlo</Button>}
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

            {isAddingMeal ? <AdminAddMeal initialName={""} initialCanteen={1} setAdding={setAdding} /> : null}
            <ListGroup>
                {mealItems}
            </ListGroup>
        </Stack>
        </Container>
    );
}

function AdminMealItem({ meal, isMutating, setIsMutating }: { meal: Meal, isMutating: boolean,
    setIsMutating: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { canteens, isLoading } = useGetCanteens();
    const [isEditing, setIsEditing] = useState(false);

    const remove = async () => {
        await deleteMeal(meal.id);
    };

    const setEditing = (b: boolean) => {
        setIsEditing(b);
        setIsMutating(b);
    };

    if (isEditing) {
        return (
            <AdminAddMeal initialName={meal.name} initialCanteen={meal.canteen_id} 
            setAdding={setEditing} mealId={meal.id} />
        );
    } else {
        return (
            <ListGroupItem key={meal.id} variant="dark">
                <Row className="align-items-start">
                    <Col><h4>{meal.name}</h4></Col>
                    <Col>Jedáleň: {isLoading ? <Spinner /> : canteens?.find(c => c.id === meal.canteen_id)?.name}</Col>
                    <Col>Naposledy podávané: {meal.last_served}</Col>
                    <Col className="d-flex justify-content-end gap-2">
                        <Button variant="danger" onClick={remove}>Odstrániť</Button>
                        <Button onClick={() => setEditing(true)} disabled={isMutating}>Upraviť</Button>
                    </Col>
                </Row>
                <RatingDisplay rating={Number(meal.rating)} precision={2} />
            </ListGroupItem>
        );
    }
}

function AdminAddMeal({ initialName, initialCanteen, setAdding, mealId }: { initialName: string, initialCanteen: number,
    setAdding: (b: boolean) => void, mealId?: number }) {
    const { canteens, isLoading } = useGetCanteens();

    // form fields
    const [canteen, setCanteen] = useState(initialCanteen);
    const [name, setName] = useState(initialName);
    const [error, setError] = useState("");
    const [validated, setValidated] = useState(false);

    if (isLoading) {
        return <Spinner />;
    }

    const submit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setValidated(true);

        if (name === "") {
            return;
        }

        const ok = mealId ? await updateMeal(mealId, name, canteen) : await addMeal(name, canteen);
        if (ok) {
            setAdding(false);
        } else {
            setError("Pridanie jedla bolo neúspešné.");
        }
    };

    return (
        <ListGroup><ListGroupItem key={mealId ?? -1} variant="dark">
            <Form noValidate onSubmit={submit}>
                <Stack gap={2}>
                    {error !== "" ? <div className="text-danger">{error}</div> : null}
                    <Form.Group>
                        <h4><Form.Control
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            isValid={validated && name !== ""}
                            isInvalid={validated && name === ""} /></h4>
                        <Form.Control.Feedback type="invalid">
                            Názov nesmie byť prázdny
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Jedáleň</Form.Label>
                        <Form.Select value={canteen} onChange={(e) => setCanteen(Number(e.target.value))}>
                            {canteens?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-center gap-2">
                        <Button type="submit">{mealId ? "Uložiť" : "Pridať"}</Button>
                        <Button onClick={() => setAdding(false)} variant="danger">Zrušiť</Button>
                    </Form.Group>
                </Stack>
            </Form>
        </ListGroupItem></ListGroup>
    );
}