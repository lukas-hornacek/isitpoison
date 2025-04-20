DROP TABLE IF EXISTS session, reviews, users, weekly_meals, meals, canteens;

-- if X_open is NULL, canteen is not open for day X
CREATE TABLE canteens (
    id serial primary key,
    name varchar(128) unique not null,
    location text not null,
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
    name varchar(128) not null,
    canteen_id int  not null references canteens(id) ON DELETE CASCADE,
    last_served date CHECK (last_served <= CURRENT_DATE),
    uploaded date not null CHECK (uploaded <= CURRENT_DATE),
    UNIQUE (name, canteen_id)
);

-- updates at the beginning of a week
CREATE TABLE weekly_meals (
    meal_id int not null references meals(id) ON DELETE CASCADE,
    weekday int not null CHECK (weekday >= 0) CHECK (weekday <= 6)
);

CREATE TABLE users (
    id serial primary key,
    username varchar(32) unique not null,
    password varchar(60) not null,
    joined date not null,
    is_admin boolean
);

CREATE TABLE reviews (
    id serial primary key,
    meal_id int not null references meals(id) ON DELETE CASCADE,
    user_id int not null references users(id) ON DELETE CASCADE,
    uploaded date not null CHECK (uploaded <= CURRENT_DATE),
    rating int CHECK (rating >= 1) CHECK (rating <= 5),
    text varchar(1024),
    UNIQUE (meal_id, user_id)
);

CREATE TABLE "session" (
  "sid" varchar NOT NULL PRIMARY KEY,
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
);