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
    ];

    const weekly = new Map<Weekday, Set<number>>();
    weekly.set(Weekday.Monday, new Set([1]));
    weekly.set(Weekday.Friday, new Set([1, 2]));

    const mealItems = meals.filter(meal =>
        weekly.get(weekday)?.has(meal.id)).map(meal =>
            <MealItem {...meal} />
    );

    return (
        <>
            <h2>{canteen.name}</h2>
            <ul>{mealItems}</ul>
        </>
    );
}