import { Button, Container, Modal, Spinner, Stack } from "react-bootstrap";
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

    const postReview = isPostingReview ? <PostReview mealId={meal.id} setIsDisplayed={setIsPostingReview} />
        : <div className="d-flex justify-content-end">
            <Button onClick={() => setIsPostingReview(true)}>Pridať recenziu</Button>
        </div>;

    return (
        <Modal show={show} onHide={handleClose} centered size="xl">
            <Modal.Header closeButton>
                <Stack>
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
                {auth.isLoggedIn && !auth.isAdmin ? postReview : null}
                {reviews.isLoading ? <Spinner /> : <ReviewList reviews={reviews.reviews ?? []}/>}
            </Modal.Body>
        </Modal> 
    );
}