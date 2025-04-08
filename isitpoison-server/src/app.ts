import "dotenv/config";

import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import pgSimple from "connect-pg-simple";

const PgSession = pgSimple(session);

import { canteen_router } from "./routers/canteen_router.js";
import { meal_router } from "./routers/meal_router.js";
import { review_router } from "./routers/review_router.js";
import { user_router } from "./routers/user_router.js";
import { auth_router } from "./routers/auth_router.js";
import { pool } from "./model/database_connection.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

if (process.env.STATUS === "production") {
    app.set("trust proxy", 1);
}

app.use(
    session({
        store: new PgSession({
            pool,
            tableName: "session", 
        }),        
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: false,
        name: "isitpoison-session",
        cookie: {
            secure: process.env.STATUS === "production",
            httpOnly: true,
            sameSite: process.env.STATUS === "production" ? "none" : "lax",
            maxAge: 1000 * 60 * 60 * 24
        }            
    })
);

app.use((err: unknown, _req: Request, res: Response, next: NextFunction): void => {
    if (err instanceof SyntaxError && "status" in err && err.status === 400 && "body" in err) {
        res.status(400).json({
            error: "Invalid JSON format",
            message: err.message
        });
        return;
    }
    next(err);
});

app.use("/api/canteen", canteen_router);
app.use("/api/meal", meal_router);
app.use("/api/review", review_router);
app.use("/api/user", user_router);
app.use("/api/auth", auth_router);

app.listen(port, () => {
    console.log(`IsItPoison? listening on port ${port}`);
});