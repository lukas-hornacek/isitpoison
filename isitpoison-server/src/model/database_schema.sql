DROP TABLE IF EXISTS likes, reviews, users, meals, canteens;

CREATE TABLE canteens (
    id serial primary key,
    name text unique not null
);

CREATE TABLE meals (
    id serial primary key,
    name text not null,
    canteen_id int references canteens(id) not null,
    last_served date,
    uploaded date not null
);

CREATE TABLE users (
    id serial primary key,
    username text unique not null,
    password varchar(60) not null
);

CREATE TABLE reviews (
    id serial primary key,
    meal_id int references meals(id) not null,
    user_id int references users(id) not null,
    rating int CHECK ( rating >= 0 ) CHECK ( rating <= 10 ),
    text text
);

CREATE TABLE likes (
    user_id int references users(id) not null,
    review_id int references reviews(id) not null,
    primary key (user_id, review_id)
);

-- CREATE TABLE submissions (
--     id serial primary key,
--     user_id int references users(id),
--     name text,
--     canteen_id int references canteens(id)
-- );