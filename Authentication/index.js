import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./src/utils/db.js";
import userRoutes from "./src/routes/user.routes.js";

dotenv.config();

const port = process.env.PORT || 8080;

const app = express();

app.use(
  cors({
    origin: process.env.BASE_URL,
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db();

app.use("/api/v1/users", userRoutes)

app.listen(port, () => {
  console.log("Server is running on port : ", port);
});
