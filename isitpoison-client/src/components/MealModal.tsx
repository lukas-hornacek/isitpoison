import { Button, Container, ListGroup, Modal, Spinner, Stack } from "react-bootstrap";
import { Meal } from "../types";
import ReviewList from "./ReviewList";
import { useGetReviewsByMeal } from "../data/review";
import { useContext, useState } from "react";
import { Authentication, AuthenticationContext } from "../auth/AuthenticationContext";
import PostReview from "./PostReview";
import RatingDisplay from "./RatingDisplay";
import { useGetCanteen } from "../data/canteen";
import { dateToString } from "../common";

export default function MealModal({ meal, show, handleClose }: { meal: Meal, show: boolean, handleClose: () => void }) {
    const auth: Authentication = useContext(AuthenticationContext)!;

    const reviews = useGetReviewsByMeal(meal.id);
    const canteen = useGetCanteen(meal.canteen_id);
    
    const [isPostingReview, setIsPostingReview] = useState(false);

    const hasReview: boolean = reviews.reviews?.some(r => r.user_id === auth.userId) ?? false;

    const ownReview = <ReviewList reviews={reviews.reviews?.filter(r => r.user_id === auth.userId) ?? []}/>;
    
    const postReview = isPostingReview ? <ListGroup><PostReview mealId={meal.id} setIsDisplayed={setIsPostingReview} /></ListGroup>
        : hasReview ? ownReview : <div className="d-flex justify-content-end">
            <Button onClick={() => setIsPostingReview(true)} disabled={hasReview}>Pridať recenziu</Button>
        </div>;

    return (
        <Modal show={show} onHide={handleClose} centered size="xl">
            <Modal.Header closeButton>
                <Stack gap={2}>
                    <h2>{meal.name}</h2>
                    <Container className="d-flex justify-content-center">
                        <RatingDisplay rating={Number(meal.rating)} precision={2}/>
                    </Container>
                    <Container className="d-flex justify-content-center">
                        Jedáleň: {canteen.isLoading ? <Spinner /> : canteen.canteen?.name}
                    </Container>
                    {meal.last_served ? <Container className="d-flex justify-content-center">
                        Naposledy podávané: {dateToString(meal.last_served)}
                    </Container> : null}
                </Stack>
            </Modal.Header>
            <Modal.Body>
                <Stack gap={2}>
                    {auth.isLoggedIn && !auth.isAdmin ? postReview : null}
                    {reviews.isLoading ? <Spinner /> : <ReviewList reviews={reviews.reviews?.filter(r => r.user_id !== auth.userId) ?? []}/>}
                </Stack>
            </Modal.Body>
        </Modal> 
    );
}