import { Button, Col, ListGroupItem, Row, Spinner } from "react-bootstrap";
import { Review } from "../types";
import { useGetUser } from "../data/user";
import RatingDisplay from "./RatingDisplay";
import { Authentication, AuthenticationContext } from "../auth/AuthenticationContext";
import { useContext, useState } from "react";
import { deleteReview } from "../data/review";
import PostReview from "./PostReview";
import { dateToString } from "../common";

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
                <Row className="align-items-start">
                    <Col>
                        {isLoading ? <Spinner animation="grow" /> : <div><h4>{user?.username}</h4>{dateToString(review.uploaded)}</div>}
                    </Col>
                    <Col className="d-flex justify-content-end gap-2">
                        {auth.isLoggedIn && !auth.isAdmin && auth.userId === review.user_id ?
                        <Button onClick={() => setIsEditing(true)}>Upraviť</Button> : null}
                        {auth.isLoggedIn && (auth.isAdmin || auth.userId === review.user_id) ?
                        <Button variant="danger" onClick={remove}>Odstrániť</Button> : null}
                    </Col>
                </Row>
                <RatingDisplay rating={review.rating} precision={0}/>
                {review.text ? <div>Text: {review.text}</div>: null}
            </ListGroupItem>
        );
    }
}