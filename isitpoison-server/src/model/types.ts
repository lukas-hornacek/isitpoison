interface Canteen {
    id: number,
    name: string
}

interface Meal {
    id: number,
    name: string,
    canteen_id: number,
    last_served: Date,
    uploaded: Date
}

interface User {
    id: number,
    username: string,
    password: string
}

interface Review {
    id: number,
    meal_id: number,
    user_id: number,
    rating: number,
    text: string
}

interface Like {
    user_id: number,
    review_id: number
}