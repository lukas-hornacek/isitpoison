import express from "express";
import bcrypt from "bcrypt";

import { insert_user, select_user_by_name } from "../queries/user_queries.js";

export const auth_router = express.Router();

auth_router.post("/login", async (req, res) => {
    if (req.session && req.session.userId) {
        res.status(401).send("Session already exists.");
        return;
    }
    if (typeof req.body["username"] !== "string") {
        res.status(400).send("field 'username' of type string is required");
        return;
    }
    if (typeof req.body["password"] !== "string") {
        res.status(400).send("field 'password' of type string is required");
        return;
    }

    const result = await select_user_by_name(req.body["username"]);
    if (result.rowCount === 0) {
        res.status(401).send("Invalid user or password.");
        return;
    }
    
    const id = result.rows[0]["id"];
    const hash = result.rows[0]["password"];
    const isAdmin = result.rows[0]["is_admin"];

    const match = await bcrypt.compare(req.body["password"], hash);
    if (!match) {
        res.status(401).send("Invalid user or password.");
        return;
    }

    req.session.userId = id;
    req.session.isAdmin = isAdmin;
    res.status(200).json({ userId: id, isAdmin: isAdmin});
});

auth_router.delete("/logout", async (req, res) => {
    if (req.session && req.session.userId) {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
                res.status(500).send();
            } else {
                res.clearCookie("isitpoison-session");
                res.status(200).send("Logout successful.");
            }
        });
    } else {
        res.status(400).send("Session does not exist.");
    }
});

auth_router.get("/status", async (req, res) => {
    if (req.session && req.session.userId) {
        res.status(200).json({ userId: req.session.userId, isAdmin: req.session.isAdmin });
    } else {
        res.status(401).send("Session does not exist.");
    }
});

auth_router.post("/register", async (req, res) => {
    if (typeof req.body["username"] !== "string") {
        res.status(400).send("Field 'username' of type string is required.");
        return;
    }
    if (typeof req.body["password"] !== "string") {
        res.status(400).send("Field 'password' of type string is required.");
        return;
    }

    try {
        const hash = await bcrypt.hash(req.body["password"], 10);
        await insert_user(req.body["username"], hash, false);
        res.status(200).send("Registration successful.");
    } catch (e: unknown) {
        if (e instanceof Error) {
            res.status(400).send(e.message);
        } else {
            res.status(500).send("Unknown error.");
        }
    }
});