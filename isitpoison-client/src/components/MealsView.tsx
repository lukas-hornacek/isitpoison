import { getAllMeals } from "../data/mock";
import MealItem from "./MealItem";

export default function MealsView() {
    const mealItems = getAllMeals().map(meal =>
        <MealItem {...meal} />
    );
    
    return (
        <>
            <h2>Zoznam jedál</h2>
            <ul>{mealItems}</ul>
        </>
    );
}