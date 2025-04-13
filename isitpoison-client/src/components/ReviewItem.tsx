import { Button, Col, ListGroupItem, Row, Spinner } from "react-bootstrap";
import { Review } from "../types";
import { useGetUser } from "../data/user";
import RatingDisplay from "./RatingDisplay";
import { Authentication, AuthenticationContext } from "../auth/AuthenticationContext";
import { useContext, useState } from "react";
import { deleteReview } from "../data/review";
import PostReview from "./PostReview";

export default function ReviewItem({ review }: { review: Review }) {
    const auth: Authentication = useContext(AuthenticationContext)!;
    const { user, isLoading } = useGetUser(review.user_id);

    const [isEditing, setIsEditing] = useState(false);

    const remove = async () => {
        if (!auth.isLoggedIn || (auth.userId !== review.user_id && !auth.isAdmin)) {
            return;
        }

        await deleteReview(review.id, review.user_id, review.meal_id);
    };

    if (isEditing) {
        return <PostReview mealId={review.meal_id} setIsDisplayed={setIsEditing} review={review}/>;
    } else {
        return (
            <ListGroupItem variant="dark">
                <Row>
                    <Col>
                        {isLoading ? <Spinner animation="grow" /> : <h4>{user?.username}</h4>}
                    </Col>
                    <Col className="d-flex justify-content-end">
                        {auth.isLoggedIn && !auth.isAdmin && auth.userId === review.user_id ?
                        <Button onClick={() => setIsEditing(true)}>Upraviť</Button> : null}
                        {auth.isLoggedIn && (auth.isAdmin || auth.userId === review.user_id) ?
                        <Button variant="danger" onClick={remove}>Odstrániť</Button> : null}
                    </Col>
                </Row>
                <RatingDisplay rating={review.rating} precision={0}/>
                {review.text ? null : <div>Text: {review.text}</div>}
            </ListGroupItem>
        );
    }
}