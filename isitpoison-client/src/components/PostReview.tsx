import { Button, Form } from "react-bootstrap";
import RatingInput from "./RatingInput";
import { useState } from "react";

export default function PostReview({ setIsPostingReview }: { setIsPostingReview: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [selected, setSelected] = useState<number>(0);
    
    return (
        <Form>
            <Form.Group>
                <Form.Label>Rating</Form.Label>
                <RatingInput selected={selected} setSelected={setSelected}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Text</Form.Label>
                <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="d-flex justify-content-end">
                <Button onClick={() => setIsPostingReview(false)}>Pridať</Button>
                <Button onClick={() => setIsPostingReview(false)} variant="danger">Zrušiť</Button>
            </Form.Group>
        </Form>
    );
}