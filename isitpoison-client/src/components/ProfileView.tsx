import { Col, Container, Row } from "react-bootstrap";

import ReviewList from "./ReviewList";
import { getReviews, getUsername } from "../data/mock";

export default function ProfileView() {
    const username = getUsername(0);

    return (
        <>
            <h2>Profil</h2>
            <Container>
                <Row>
                    <Col sm={12} md={3}>
                        <h3>{username}</h3>
                        Používateľom od 25.2.2025 <br></br>
                        Počet recenzií: 5
                    </Col>
                    <Col sm={12} md={9}>
                        <h3>Moje recenzie</h3>
                        <ReviewList reviews={getReviews()}/>
                    </Col>
                </Row>
            </Container>
        </>
    );
}