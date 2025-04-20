# Is it Poison?

Is it Poison? is a web application, where you can post and read reviews for foods served in university canteens (canteens that
primarily serve students and staff of universities).

## Deployment

To deploy the application on a local machine follow these steps:

1. Clone the repository `git clone https://github.com/lukas-hornacek/isitpoison.git`

2. Set up PostgreSQL database

    1. Create a new PostgreSQL database and an user that the application can use to access it
    
        *It is recommended to give the user permission only for data manipulation and not data definition, so that the application can use queries such as SELECT or INSERT, but not DROP TABLE*

    2. Create tables in the database by running `isitpoisonserver/src/model/database_schema.sql` with user that has data definition privileges

    3. Create .env file with the following values: SESSION_SECRET, STATUS=development, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE

3. Install dependencies with `npm install` in both `isitpoison-client` and `isitpoison-server` folders

4. Start client from `isitpoison-client` folder with `npm run dev`

5. Start server from `isitpoison-server` folder with `npm run start`