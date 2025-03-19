import { ListGroupItem, Spinner } from "react-bootstrap";
import { Review } from "../types";
import { useGetUser } from "../data/user";
import AverageRating from "./AverageRating";

export default function ReviewItem({ user_id, rating, text }: Review) {
    const { user, isLoading } = useGetUser(user_id);

    return (
        <ListGroupItem variant="dark">
            {isLoading ? <Spinner animation="grow" /> : <h4>{user?.username}</h4>}
            <AverageRating rating={rating}/>
            <div>Text: {text}</div>
        </ListGroupItem>
    );
}