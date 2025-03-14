import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';

import { Canteen } from "../types";
import { Weekday } from "../common";
import MealItem from "./MealItem";

export default function CanteenItem({ canteen, weekday }: { canteen: Canteen, weekday: Weekday }) {
    const meals = [
        {
            id: 1,
            name: "Vajíčko",
            canteen_id: canteen.id,
            last_served: new Date("2025-02-25"),
            uploaded: new Date("2025-02-25"),
        },
        {
            id: 2,
            name: "Kari",
            canteen_id: canteen.id,
            last_served: new Date("2025-02-25"),
            uploaded: new Date("2025-02-25"),
        },
        {
            id: 3,
            name: "Zemiak",
            canteen_id: canteen.id,
            last_served: new Date("2025-02-25"),
            uploaded: new Date("2025-02-25"),
        },
        {
            id: 4,
            name: "Hranolka",
            canteen_id: canteen.id,
            last_served: new Date("2025-02-25"),
            uploaded: new Date("2025-02-25"),
        },
        {
            id: 5,
            name: "Ryža",
            canteen_id: canteen.id,
            last_served: new Date("2025-02-25"),
            uploaded: new Date("2025-02-25"),
        },
        {
            id: 6,
            name: "Kaša",
            canteen_id: canteen.id,
            last_served: new Date("2025-02-25"),
            uploaded: new Date("2025-02-25"),
        },
    ];

    const weekly = new Map<Weekday, Set<number>>();
    weekly.set(Weekday.Monday, new Set([1]));
    weekly.set(Weekday.Friday, new Set([1, 2, 3, 4, 5, 6]));

    const mealItems = meals.filter(meal =>
        weekly.get(weekday)?.has(meal.id)).map(meal =>
            <MealItem {...meal} />
    );

    return (
        <>
            <h2>{canteen.name}</h2>
            <Container>
                <Row className="g-4">
                    {mealItems}
                </Row>
            </Container>
        </>
    );
}