export interface Canteen {
    id: number,
    name: string,
    location: string,
    monday_open?: string,
    monday_close?: string,
    tuesday_open?: string,
    tuesday_close?: string,
    wednesday_open?: string,
    wednesday_close?: string,
    thursday_open?: string,
    thursday_close?: string,
    friday_open?: string,
    friday_close?: string,
    saturday_open?: string,
    saturday_close?: string,
    sunday_open?: string,
    sunday_close?: string
}

export interface Meal {
    id: number,
    name: string,
    canteen_id: number,
    last_served: string,
    uploaded: string,
    rating: string,
}

export interface User {
    id: number,
    username: string,
    joined: Date,
    reviews: string,
    is_admin: boolean
}

export interface Review {
    id: number,
    meal_id: number,
    user_id: number,
    uploaded: string,
    rating: number,
    text: string
}
