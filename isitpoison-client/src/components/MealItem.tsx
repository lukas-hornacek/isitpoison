import { Meal } from "../types";

export default function MealItem({ id, name }: Meal) {
    return (
        <li key={id}>
            <div>{name}</div>
            <div>Rating: 5</div>
            <button>Detail</button>
        </li>
    );
}