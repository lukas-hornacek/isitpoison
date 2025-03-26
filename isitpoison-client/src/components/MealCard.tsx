import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { useState } from "react";

import { Meal } from "../types";
import MealModal from "./MealModal";
import RatingDisplay from "./RatingDisplay";

export default function MealCard({ meal }: { meal: Meal }) {
    const [showDetail, setShowDetail] = useState(false);

    const handleCloseDetail = () => setShowDetail(false);
    const handleShowDetail = () => setShowDetail(true);

    return (
        <>
            <Col key={meal.id} lg={3} md={4} sm={6} xs={12} className="d-flex justify-content-center">
                <Card style={{ width: "100%", maxWidth: "15em" }} className="shadow">
                    <Card.Body>
                        <Card.Title>{meal.name}</Card.Title>
                        <Card.Subtitle><RatingDisplay rating={Number(meal.rating)} precision={2} /></Card.Subtitle>
                        <Button onClick={handleShowDetail}>Detail</Button>
                    </Card.Body>
                </Card>
            </Col>

            <MealModal meal={meal} show={showDetail} handleClose={handleCloseDetail}/>
        </>
    );
}