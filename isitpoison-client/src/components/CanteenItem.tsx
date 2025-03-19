import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { Canteen } from "../types";
import { Weekday } from "../common";
import MealItem from "./MealItem";
import { Button, Spinner } from "react-bootstrap";
import { useState } from "react";
import CanteenDetail from "./CanteenDetail";
import { useGetWeeklyMeals } from "../data/meal";

export default function CanteenItem({ canteen, weekday }: { canteen: Canteen, weekday: Weekday }) {
    const [showDetail, setShowDetail] = useState(false);
    
    const handleCloseDetail = () => setShowDetail(false);
    const handleShowDetail = () => setShowDetail(true);

    const meals = useGetWeeklyMeals(canteen.id, weekday);

    if (meals.isLoading) {
        return <Spinner animation="grow" />;
    }

    const mealItems = meals.meals?.map(meal =>
            <MealItem key={meal.id} meal={meal} />
    );

    return (
        <>
            <h2>{canteen.name}
                <Button onClick={handleShowDetail}>
                    Detail
                </Button>
            </h2>

            <Container>
                <Row className="g-4">
                    {mealItems}
                </Row>
            </Container>

            <CanteenDetail canteen={canteen} show={showDetail} handleClose={handleCloseDetail} />
        </>
    );
}