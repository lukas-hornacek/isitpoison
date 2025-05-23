import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import { useState } from "react";

import CanteenItem from "../components/CanteenItem";
import WeekdayButtons from "../components/WeekdayButtons";
import { today } from "../common";
import { useGetCanteens } from "../data/canteen";
import { Accordion, Spinner } from "react-bootstrap";

export default function WeeklyView() {
    const [day, setDay] = useState(today());

    const { canteens, isLoading } = useGetCanteens();

    if (isLoading) {
        return <Spinner />;
    }

    const canteenItems = canteens?.map(c =>
        <CanteenItem key={c.id} canteen={c} weekday={day} />
    );

    return (
        <Stack gap={2}>
            <h2>Aktuálna ponuka</h2>
            <Container className="d-flex justify-content-center">
                <WeekdayButtons day={day} setDay={setDay} />
            </Container>
            <Container className="d-flex justify-content-center">
                <Accordion alwaysOpen className="w-100">
                    {canteenItems}
                </Accordion>
            </Container>
        </Stack>
    );
}
