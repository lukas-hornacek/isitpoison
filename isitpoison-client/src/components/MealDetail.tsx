import { Button, Col, Container, Modal, Row, Spinner, Stack } from "react-bootstrap";
import { Meal } from "../types";
import ReviewList from "./ReviewList";
import AverageRating from "./AverageRating";
import { useGetReviewsByMeal } from "../data/review";
import { useContext, useState } from "react";
import { Authentication, AuthenticationContext } from "../auth/AuthenticationContext";
import PostReview from "./PostReview";

export default function MealDetail({ meal, show, handleClose }: { meal: Meal, show: boolean, handleClose: () => void }) {
    const auth: Authentication = useContext(AuthenticationContext)!;

    const { reviews, isLoading } = useGetReviewsByMeal(meal.id);
    const [isPostingReview, setIsPostingReview] = useState(false);

    const postReview = isPostingReview ? <PostReview setIsPostingReview={setIsPostingReview} />
        : <Row><Col className="d-flex justify-content-end">
                <Button onClick={() => setIsPostingReview(true)}>Pridať recenziu</Button>
        </Col></Row>;

    return (
        <Modal show={show} onHide={handleClose} centered size="xl">
            <Modal.Header closeButton>
                <Stack>
                    <h2>{meal.name}</h2>
                    <Container className="d-flex justify-content-center">
                        <AverageRating rating={Number(meal.rating)}/>
                    </Container>
                </Stack>
            </Modal.Header>
            <Modal.Body>
                {auth.isLoggedIn && !auth.isAdmin ? postReview : null}
                {isLoading ? <Spinner animation="grow" /> : <ReviewList reviews={reviews!}/>}
            </Modal.Body>
        </Modal> 
    );
}