import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import MealItem from "./MealItem";
import FilterBar from "./FilterBar";
import { useGetMeals } from "../data/meal";
import { Spinner } from "react-bootstrap";
import { useState } from "react";
import { Ordering } from "../common";

export interface Filters {
    canteen_ids?: number[],
    ordering?: Ordering,
    substring?: string,
}

export default function MealsView() {
    const [filters, setFilters] = useState<Filters>({});    

    const { meals, isLoading } = useGetMeals(filters.canteen_ids, filters.ordering, filters.substring);

    if (isLoading) {
        return <Spinner />;
    }

    const mealItems = meals!.map(meal =>
        <MealItem key={meal.id} meal={meal} />
    );
    
    return (
        <>
            <h2>Všetky jedlá</h2>
            <FilterBar filters={filters} setFilters={setFilters} />
            <Container>
                <Row className="g-4">
                    {mealItems}
                </Row>
            </Container>
        </>
    );
}