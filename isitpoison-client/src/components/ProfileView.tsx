import { Col, Container, Row, Spinner } from "react-bootstrap";

import ReviewList from "./ReviewList";
import { useGetUser } from "../data/user";
import { useGetReviewsByUser } from "../data/review";

export default function ProfileView() {
    const user = useGetUser(1);
    const reviews = useGetReviewsByUser(1);
    
    return (
        <>
            <h2>Profil</h2>
            <Container>
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
        </>
    );
}