import { ListGroupItem, Row, Col, Button } from "react-bootstrap";
import { Meal } from "../types";
import RatingDisplay from "./RatingDisplay";

export default function MealItem({ meal }: { meal: Meal }) {
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