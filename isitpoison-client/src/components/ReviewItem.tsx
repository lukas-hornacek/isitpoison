import { Button, Col, ListGroupItem, Row, Spinner } from "react-bootstrap";
import { Review } from "../types";
import { useGetUser } from "../data/user";
import RatingDisplay from "./RatingDisplay";
import { Authentication, AuthenticationContext } from "../auth/AuthenticationContext";
import { useContext } from "react";

export default function ReviewItem({ user_id, rating, text }: Review) {
    const auth: Authentication = useContext(AuthenticationContext)!;
    const { user, isLoading } = useGetUser(user_id);

    return (
        <ListGroupItem variant="dark">
            <Row>
                <Col>
                    {isLoading ? <Spinner animation="grow" /> : <h4>{user?.username}</h4>}
                </Col>
                <Col className="d-flex justify-content-end">
                    {auth.isLoggedIn && !auth.isAdmin && auth.userId === user_id ?
                    <Button>Upraviť recenziu</Button> : null}
                    {auth.isLoggedIn && (auth.isAdmin || auth.userId === user_id) ?
                    <Button variant="danger">Odstrániť</Button> : null}
                </Col>
            </Row>
            <RatingDisplay rating={rating} precision={0}/>
            <div>Text: {text}</div>
        </ListGroupItem>
    );
}