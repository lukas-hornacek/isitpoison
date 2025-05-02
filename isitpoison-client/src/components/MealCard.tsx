import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { useState } from "react";

import { Meal } from "../types";
import MealModal from "./MealModal";
import RatingDisplay from "./RatingDisplay";
import { useGetCanteen } from "../data/canteen";

export default function MealCard({ meal }: { meal: Meal }) {
    const [showDetail, setShowDetail] = useState(false);
    const canteen = useGetCanteen(meal.canteen_id);

    const handleCloseDetail = () => setShowDetail(false);
    const handleShowDetail = () => setShowDetail(true);

    return (
        <>
            <Col key={meal.id} lg={3} md={4} sm={6} xs={12} className="d-flex justify-content-center">
                <Card className="shadow">
                    <Card.Body className="d-flex flex-column">
                        <Card.Title>{meal.name}</Card.Title>
                        <Card.Subtitle><RatingDisplay rating={Number(meal.rating)} precision={2} /></Card.Subtitle>
                        {canteen.isLoading ? null : <Card.Text><small>{canteen.canteen?.name}</small></Card.Text>}
                        <div className="mt-auto d-flex justify-content-end">
                            <Button onClick={handleShowDetail}>Detail</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>

            <MealModal meal={meal} show={showDetail} handleClose={handleCloseDetail}/>
        </>
    );
}