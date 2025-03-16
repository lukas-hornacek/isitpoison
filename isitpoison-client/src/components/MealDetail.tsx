import { Container, Modal, Stack } from "react-bootstrap";
import { getMealRating, getReviews } from "../data/mock";
import { Meal } from "../types";
import ReviewList from "./ReviewList";
import AverageRating from "./AverageRating";

export default function MealDetail({ meal, show, handleClose }: { meal: Meal, show: boolean, handleClose: () => void }) {
    return (
        <>
            <Modal show={show} onHide={handleClose} centered size="lg">
                <Modal.Header closeButton>
                    <Stack>
                        <h2>{meal.name}</h2>
                        <Container className="d-flex justify-content-center">
                            <AverageRating rating={getMealRating(meal.id)}/>
                        </Container>
                    </Stack>
                </Modal.Header>
                <Modal.Body>
                    <ReviewList reviews={getReviews()}/>
                </Modal.Body>
            </Modal> 
        </>
    );
}