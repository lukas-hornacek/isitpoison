import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';

import { Canteen } from "../types";
import { Weekday } from "../common";
import MealItem from "./MealItem";
import { getMealsForDay } from "../data/mock";

export default function CanteenItem({ canteen, weekday }: { canteen: Canteen, weekday: Weekday }) {
    const mealItems = getMealsForDay(weekday).map(meal =>
            <MealItem key={meal.id} meal={meal} />
    );

    return (
        <>
            <h2>{canteen.name}</h2>
            <Container>
                <Row className="g-4">
                    {mealItems}
                </Row>
            </Container>
        </>
    );
}