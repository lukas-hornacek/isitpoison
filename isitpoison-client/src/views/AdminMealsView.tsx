import Container from "react-bootstrap/Container";

import FilterBar from "../components/FilterBar";
import { useGetMeals } from "../data/meal";
import { Button, Col, ListGroup, ListGroupItem, Row, Spinner } from "react-bootstrap";
import { useContext, useState } from "react";
import { Ordering } from "../common";
import { AuthenticationContext } from "../auth/AuthenticationContext";
import RatingDisplay from "../components/RatingDisplay";
import { Meal } from "../types";

export interface Filters {
    canteen_ids?: number[],
    ordering?: Ordering,
    substring?: string,
}

export default function AdminMealsView() {
    const auth = useContext(AuthenticationContext)!;

    const [filters, setFilters] = useState<Filters>({});    

    const { meals, isLoading } = useGetMeals(filters.canteen_ids, filters.ordering, filters.substring);

    if (!auth.isAdmin) {
        return (
            <h2>Chyba prístupu</h2>
        );
    }

    if (isLoading) {
        return <Spinner />;
    }

    const mealItems = meals!.map(meal => <AdminMealItem meal={meal} />);
    
    return (
        <>
            <h2>Jedlá</h2>
            <FilterBar filters={filters} setFilters={setFilters} />
            <Container>
                <ListGroup>
                    {mealItems}
                </ListGroup>
            </Container>
        </>
    );
}

function AdminMealItem({ meal }: { meal: Meal }) {
    return (
    <ListGroupItem key={meal.id} variant="dark">
        <Row>
            <Col>
                <h4>{meal.name}</h4>
            </Col>
            <Col className="d-flex justify-content-end">
                <Button variant="danger">Odstrániť</Button>
            </Col>
        </Row>
        <RatingDisplay rating={Number(meal.rating)} precision={2} />
    </ListGroupItem>
    );
}