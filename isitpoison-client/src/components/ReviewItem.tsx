import { Button, Col, ListGroupItem, Row, Spinner } from "react-bootstrap";
import { Review } from "../types";
import { useGetUser } from "../data/user";
import RatingDisplay from "./RatingDisplay";
import { Authentication, AuthenticationContext } from "../auth/AuthenticationContext";
import { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import RatingInput from "./RatingInput";

export default function ReviewItem({ user_id, rating, text }: Review) {
    const auth: Authentication = useContext(AuthenticationContext)!;
    const { user, isLoading } = useGetUser(user_id);

    const [isEditing, setIsEditing] = useState(false);
    const [newRating, setNewRating] = useState(rating);
    const [newText, setNewText] = useState(text);

    const submit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <ListGroupItem variant="dark">
                {isLoading ? <Spinner animation="grow" /> : <h4>{user?.username}</h4>}
                <Form onSubmit={submit}>
                    <RatingInput selected={newRating} setSelected={setNewRating}/>
                    <Form.Group>
                        <Form.Label>Text: </Form.Label>
                        <Form.Control value={newText} onChange={(e) => setNewText(e.target.value)} type="text" />
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-center">
                        <Button type="submit">Upraviť</Button>
                        <Button onClick={() => setIsEditing(false)} variant="danger">Zrušiť</Button>
                    </Form.Group>
                </Form>
            </ListGroupItem>
        );
    } else {
        return (
            <ListGroupItem variant="dark">
                <Row>
                    <Col>
                        {isLoading ? <Spinner animation="grow" /> : <h4>{user?.username}</h4>}
                    </Col>
                    <Col className="d-flex justify-content-end">
                        {auth.isLoggedIn && !auth.isAdmin && auth.userId === user_id ?
                        <Button onClick={() => setIsEditing(true)}>Upraviť</Button> : null}
                        {auth.isLoggedIn && (auth.isAdmin || auth.userId === user_id) ?
                        <Button variant="danger">Odstrániť</Button> : null}
                    </Col>
                </Row>
                <RatingDisplay rating={newRating} precision={0}/>
                <div>Text: {newText}</div>
            </ListGroupItem>
        );
    }
}