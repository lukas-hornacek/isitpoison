import { Button, Container, Form, ListGroupItem } from "react-bootstrap";
import RatingInput from "./RatingInput";
import { useContext, useState } from "react";
import { addReview, updateReview } from "../data/review";
import { AuthenticationContext } from "../auth/AuthenticationContext";
import { Review } from "../types";

export default function PostReview({ mealId, setIsDisplayed, review }: { mealId: number,
    setIsDisplayed: React.Dispatch<React.SetStateAction<boolean>>, review?: Review }) {
    const [rating, setRating] = useState<number>(review?.rating ?? 0);
    const [text, setText] = useState<undefined | string>(review?.text !== "NULL" ? review?.text : "");

    const auth = useContext(AuthenticationContext)!;
    const [error, setError] = useState("");
    
    const submit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!auth.isLoggedIn || !auth.userId) {
            setError("Pridávať recenzie môže iba prihlásený používateľ");
            return;
        }
        if (rating === 0) {
            setError("Hodnotenie musí byť medzi 1 a 5 hviezdičkami.");
            return;
        }

        const ok = review ? await updateReview(review.id, review.meal_id, review.user_id,
            rating, text) : await addReview(mealId, auth.userId, rating, text);
        if (ok) {
            setIsDisplayed(false);
        } else {
            setError("Pridanie recenzie bolo neúspešné.");
        }
    };

    return (
        <ListGroupItem variant="dark">
            <Form onSubmit={submit}>
                <Container>
                    {error !== "" ? <div className="text-danger">{error}</div> : null}
                    <Form.Group>
                        <Form.Label>Hodnotenie</Form.Label>
                        <RatingInput selected={rating} setSelected={setRating}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Text</Form.Label>
                        <Form.Control
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-center">
                        <Button type="submit">Pridať</Button>
                        <Button onClick={() => setIsDisplayed(false)} variant="danger">Zrušiť</Button>
                    </Form.Group>
                </Container>
            </Form>
        </ListGroupItem>
    );
}