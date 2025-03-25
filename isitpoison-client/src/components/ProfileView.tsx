import { Col, Container, Row, Spinner } from "react-bootstrap";

import ReviewList from "./ReviewList";
import { useGetUser } from "../data/user";
import { useGetReviewsByUser } from "../data/review";
import { useContext } from "react";
import { Authentication, AuthenticationContext } from "../auth/AuthenticationContext";

export default function ProfileView() {
    const auth: Authentication = useContext(AuthenticationContext)!;

    const user = useGetUser(auth.userId);
    const reviews = useGetReviewsByUser(auth.userId);

    if (auth.isLoggedIn) {
        return (
                <Container>
                    <h2>Profil</h2>
                    <Row>
                        <Col sm={12} md={3}>
                            {user.isLoading ? <Spinner animation="grow" />
                            : <><h3>{user.user?.username}</h3>
                            Používateľom od {user.user?.joined.toString()} <br></br>
                            Počet recenzií: {user.user?.reviews}</>}
                        </Col>
                        <Col sm={12} md={9}>
                            <h3>Moje recenzie</h3>
                            {reviews.isLoading ? <Spinner animation="grow" /> : <ReviewList reviews={reviews.reviews!}/>}
                        </Col>
                    </Row>
                </Container>
        );
    } else {
        return (
            <Container>
                <h2>Profil</h2>
                <div>Na zobrazenie profilu je potrebné prihlásiť sa.</div>
            </Container>
        );
    }
}