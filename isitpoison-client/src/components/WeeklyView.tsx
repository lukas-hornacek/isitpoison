import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import { useState } from "react";

import CanteenItem from "./CanteenItem";
import WeekdayButtons from "./WeekdayButtons";
import { today } from "../common";
import { getCanteens } from "../data/mock";

export default function WeeklyView() {
    const [day, setDay] = useState(today());

    const canteenItems = getCanteens().map(c =>
        <CanteenItem key={c.id} canteen={c} weekday={day} />
    );

    return (
        <>
            <Container className="d-flex justify-content-center">
                <WeekdayButtons day={day} setDay={setDay} />
            </Container>
            <Stack gap={3}>
                {canteenItems}
            </Stack>
        </>
    );
}
