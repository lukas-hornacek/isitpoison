// @ts-ignore
interface Canteen {
    id: number,
    name: string
}

// @ts-ignore
interface Meal {
    id: number,
    name: string,
    canteen_id: number,
    last_served: Date,
    uploaded: Date
}

// @ts-ignore
interface User {
    id: number,
    username: string,
    password: string
}

// @ts-ignore
interface Review {
    id: number,
    meal_id: number,
    user_id: number,
    rating: number,
    text: string
}

// @ts-ignore
interface Like {
    user_id: number,
    review_id: number
}