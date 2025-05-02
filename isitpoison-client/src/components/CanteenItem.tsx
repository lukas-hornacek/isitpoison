import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { Canteen } from "../types";
import { hoursToString, Weekday } from "../common";
import MealCard from "./MealCard";
import { Accordion, Col, Spinner } from "react-bootstrap";
import { useState } from "react";
import CanteenModal from "./CanteenModal";
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
            <MealCard key={meal.id} meal={meal} />
    );

    let hours: string;
    switch (weekday) {
        case Weekday.Monday:
            hours = hoursToString(canteen.monday_open, canteen.monday_close);
            break;
        case Weekday.Tuesday:
            hours = hoursToString(canteen.tuesday_open, canteen.tuesday_close);
            break;
        case Weekday.Wednesday:
            hours = hoursToString(canteen.wednesday_open, canteen.wednesday_close);
            break;
        case Weekday.Thursday:
            hours = hoursToString(canteen.thursday_open, canteen.thursday_close);
            break;
        case Weekday.Friday:
            hours = hoursToString(canteen.friday_open, canteen.friday_close);
            break;
        case Weekday.Saturday:
            hours = hoursToString(canteen.saturday_open, canteen.saturday_close);
            break;
        case Weekday.Sunday:
            hours = hoursToString(canteen.sunday_open, canteen.sunday_close);
            break;
    }

    return (
        <Accordion.Item eventKey={canteen.id.toString()}>
            <Accordion.Header>
                <Container className="d-flex justify-content-center">
                    <Col>
                        <h2>{canteen.name}</h2>
                        <p className="d-flex justify-content-center">{hours}</p>
                    </Col>
                    <div className="mb-auto d-flex justify-content-end">
                        <span
                            role="button"
                            tabIndex={0}
                            className="btn btn-primary ms-3"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent accordion toggle
                                handleShowDetail();
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    handleShowDetail();
                                }
                            }}
                        >
                            Detail
                        </span>
                    </div>
                    
                </Container>
            </Accordion.Header>
            <Accordion.Body>
                <Container>
                    <Row className="g-4">
                        {mealItems}
                    </Row>
                </Container>

                <CanteenModal canteen={canteen} show={showDetail} handleClose={handleCloseDetail} />
            </Accordion.Body>
        </Accordion.Item>
    );
}