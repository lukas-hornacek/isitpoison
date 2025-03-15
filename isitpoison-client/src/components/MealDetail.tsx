import { Modal, Stack } from "react-bootstrap";
import { getReviews } from "../data/mock";
import { Meal } from "../types";
import ReviewList from "./ReviewList";

export default function MealDetail({ meal, show, handleClose }: { meal: Meal, show: boolean, handleClose: () => void }) {
    return (
        <>
            <Modal show={show} onHide={handleClose} centered size="lg">
                <Modal.Header closeButton>
                    <Stack>
                        <h2>{meal.name}</h2>
                        <h3>Rating: 5</h3>
                    </Stack>
                </Modal.Header>
                <Modal.Body>
                    <ReviewList reviews={getReviews()}/>
                </Modal.Body>
            </Modal> 
        </>
    );
}