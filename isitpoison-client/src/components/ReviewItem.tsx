import { ListGroupItem } from "react-bootstrap";
import { Review } from "../types";
import { getUsername } from "../data/mock";

export default function ReviewItem({ user_id, rating, text }: Review) {
    return (
        <ListGroupItem variant="dark">
            <h4>{getUsername(user_id)}</h4>
            <div>Rating: {rating}</div>
            <div>Text: {text}</div>
        </ListGroupItem>
    );
}