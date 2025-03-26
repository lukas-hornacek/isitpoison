import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import MealItem from "../components/MealItem";
import FilterBar from "../components/FilterBar";
import { useGetMeals } from "../data/meal";
import { Spinner } from "react-bootstrap";
import { useState } from "react";
import { MealFilters } from "../common";

export default function MealsView() {
    const [filters, setFilters] = useState<MealFilters>({});    

    const { meals, isLoading } = useGetMeals(filters.canteen_ids, filters.ordering, filters.substring);

    if (isLoading) {
        return <Spinner />;
    }

    const mealItems = meals!.map(meal =>
        <MealItem key={meal.id} meal={meal} />
    );
    
    return (
        <>
            <h2>Jedlá</h2>
            <FilterBar filters={filters} setFilters={setFilters} />
            <Container>
                <Row className="g-4">
                    {mealItems}
                </Row>
            </Container>
        </>
    );
}