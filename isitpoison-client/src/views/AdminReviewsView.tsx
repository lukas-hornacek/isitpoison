import { useContext, useState } from "react";
import { AuthenticationContext } from "../auth/AuthenticationContext";
import ReviewList from "../components/ReviewList";
import { Button, ButtonToolbar, Container, Form, InputGroup, Spinner } from "react-bootstrap";
import { useGetReviews } from "../data/review";

export default function AdminReviewsView() {
    const auth = useContext(AuthenticationContext)!;

    const [searchText, setSearchText] = useState("");
    const [finalText, setFinalText] = useState("");

    const { reviews, isLoading } = useGetReviews(finalText);

    if (!auth.isAdmin) {
        return (
            <h2>Chyba prístupu</h2>
        );
    }

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <Container>
            <h2>Recenzie</h2>
            <ButtonToolbar className="d-flex justify-content-center">
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="Zadaj text recenzie"
                        aria-label="Text recenzie"
                        onChange={(event) => setSearchText(event.target.value)}
                        value={searchText}
                    />
                    <Button variant="success" onClick={() => setFinalText(searchText)}>Vyhľadaj</Button>
                </InputGroup>
            </ButtonToolbar>

            <ReviewList reviews={reviews!} />
        </Container>        
    );
}