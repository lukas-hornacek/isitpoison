import express from "express";
import path from "path";

import { canteen_router } from "./routers/canteen_router.js";
import { meal_router } from "./routers/meal_router.js";
import { review_router } from "./routers/review_router.js";
import { user_router } from "./routers/user_router.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static(path.join(import.meta.dirname, "..", "..", "isitpoison-client", "dist")));

app.use("/canteen", canteen_router);
app.use("/meal", meal_router);
app.use("/review", review_router);
app.use("/user", user_router);

app.listen(port, () => {
  console.log(`IsItPoison? listening on port ${port}`);
});