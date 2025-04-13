import { ListGroup } from "react-bootstrap";
import { Review } from "../types";
import ReviewItem from "./ReviewItem";

export default function ReviewList({ reviews }: { reviews: Review[]}) {
    const reviewItems = reviews.map(r =>
        <ReviewItem key={r.id} review={r}/>
    );

    return (
        <ListGroup>
            {reviewItems}
        </ListGroup>
    );
}