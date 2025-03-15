import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { getAllMeals } from "../data/mock";
import MealItem from "./MealItem";
import FilterBar from "./FilterBar";

export default function MealsView() {
    const mealItems = getAllMeals().map(meal =>
        <MealItem key={meal.id} meal={meal} />
    );
    
    return (
        <>
            <h2>Všetky jedlá</h2>
            <FilterBar />
            <Container>
                <Row className="g-4">
                    {mealItems}
                </Row>
            </Container>
        </>
    );
}