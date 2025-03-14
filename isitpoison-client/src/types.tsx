enum Weekday {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
}

export interface Canteen {
    id: number,
    name: string,
    location: string
}

export interface OpeningHours {
    id: number,
    monday_open: Date,
    monday_close: Date,
    tuesday_open: Date,
    tuesday_close: Date,
    wednesday_open: Date,
    wednesday_close: Date,
    thursday_open: Date,
    thursday_close: Date,
    friday_open: Date,
    friday_close: Date,
    saturday_open: Date,
    saturday_close: Date,
    sunday_open: Date,
    sunday_close: Date
}

export interface Meal {
    id: number,
    name: string,
    canteen_id: number,
    last_served: Date,
    uploaded: Date
}

export interface WeeklyMeal {
    meal_id: number,
    weekday: Weekday
}

export interface User {
    id: number,
    username: string,
    password: string,
    is_admin: boolean
}

export interface Review {
    id: number,
    meal_id: number,
    user_id: number,
    uploaded: Date,
    rating: number,
    text: string
}
