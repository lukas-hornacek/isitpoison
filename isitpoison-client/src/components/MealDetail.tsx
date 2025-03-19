import { Container, Modal, Spinner, Stack } from "react-bootstrap";
import { Meal } from "../types";
import ReviewList from "./ReviewList";
import AverageRating from "./AverageRating";
import { useGetReviewsByMeal } from "../data/review";

export default function MealDetail({ meal, show, handleClose }: { meal: Meal, show: boolean, handleClose: () => void }) {
    const { reviews, isLoading } = useGetReviewsByMeal(meal.id);
    
    return (
        <>
            <Modal show={show} onHide={handleClose} centered size="lg">
                <Modal.Header closeButton>
                    <Stack>
                        <h2>{meal.name}</h2>
                        <Container className="d-flex justify-content-center">
                            <AverageRating rating={Number(meal.rating)}/>
                        </Container>
                    </Stack>
                </Modal.Header>
                <Modal.Body>
                    {isLoading ? <Spinner animation="grow" /> : <ReviewList reviews={reviews!}/>}
                </Modal.Body>
            </Modal> 
        </>
    );
}