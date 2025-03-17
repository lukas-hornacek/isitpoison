import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { useState } from "react";

import { Meal } from "../types";
import { getMealRating } from "../data/mock";
import MealDetail from "./MealDetail";
import AverageRating from "./AverageRating";

export default function MealItem({ meal }: { meal: Meal }) {
    const [showDetail, setShowDetail] = useState(false);

    const handleCloseDetail = () => setShowDetail(false);
    const handleShowDetail = () => setShowDetail(true);

    return (
        <>
            <Col key={meal.id} lg={3} md={4} sm={6} xs={12} className="d-flex justify-content-center">
                <Card style={{ width: "100%", maxWidth: "15em" }} className="shadow">
                    <Card.Body>
                        <Card.Title>{meal.name}</Card.Title>
                        <Card.Subtitle><AverageRating rating={getMealRating(meal.id)} /></Card.Subtitle>
                        <Button onClick={handleShowDetail}>Detail</Button>
                    </Card.Body>
                </Card>
            </Col>

            <MealDetail meal={meal} show={showDetail} handleClose={handleCloseDetail}/>
        </>
    );
}