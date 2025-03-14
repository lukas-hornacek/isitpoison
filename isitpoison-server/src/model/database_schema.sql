DROP TABLE IF EXISTS reviews, users, weekly_meals, meals, opening_hours, canteens;

CREATE TABLE canteens (
    id serial primary key,
    name text unique not null,
    location text not null
);

-- if X_open is NULL, canteen is not open for day X
CREATE TABLE opening_hours (
    id int unique references canteens(id),
    monday_open     time,
    monday_close    time,
    tuesday_open    time,
    tuesday_close   time,
    wednesday_open  time,
    wednesday_close time,
    thursday_open   time,
    thursday_close  time,
    friday_open     time,
    friday_close    time,
    saturday_open   time,
    saturday_close  time,
    sunday_open     time,
    sunday_close    time
);

CREATE TABLE meals (
    id serial primary key,
    name text not null,
    canteen_id int references canteens(id) not null,
    last_served date CHECK (last_served <= CURRENT_DATE),
    uploaded date not null CHECK (uploaded <= CURRENT_DATE)
);

-- updates at the beginning of a week
CREATE TABLE weekly_meals (
    meal_id int not null references meals(id),
    weekday int not null CHECK (weekday >= 0) CHECK (weekday <= 6)
);

CREATE TABLE users (
    id serial primary key,
    username text unique not null,
    password varchar(60) not null,
    is_admin boolean
);

CREATE TABLE reviews (
    id serial primary key,
    meal_id int references meals(id) not null,
    user_id int references users(id) not null,
    uploaded date not null CHECK (uploaded <= CURRENT_DATE),
    rating int CHECK (rating >= 0) CHECK (rating <= 10),
    text text
);