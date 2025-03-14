import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import { useState } from "react";

import CanteenItem from "./CanteenItem";
import WeekdayButtons from "./WeekdayButtons";
import { today } from "../common";

export default function WeeklyView() {
    const [day, setDay] = useState(today());

    const canteens = [
        { id: 1, name: "Eat & Meet", location: "loc1" },
        { id: 2, name: "FreeFood", location: "loc2" },
        { id: 3, name: "FaynFood", location: "loc3" },
        { id: 4, name: "FiitFood", location: "loc4" },
    ];
    const canteenItems = canteens.map(c =>
        <CanteenItem canteen={c} weekday={day} />
    );   

    return (
        <>
            <Container className="d-flex justify-content-center"><WeekdayButtons day={day} setDay={setDay} /></Container>
            <Stack gap={3}>
                {canteenItems}
            </Stack>
        </>
    );
}
