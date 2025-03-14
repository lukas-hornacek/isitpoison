import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from 'react-bootstrap/Col';

import { Meal } from "../types";

export default function MealItem({ id, name }: Meal) {
    return (
        <Col key={id} lg={3} md={4} sm={6} xs={12} className="d-flex justify-content-center">
            <Card style={{ width: "100%", maxWidth: "15em" }} className="shadow">
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Subtitle>Rating: 5</Card.Subtitle>
                    <Button>Detail</Button>
                </Card.Body>
            </Card>
        </Col>
    );
}