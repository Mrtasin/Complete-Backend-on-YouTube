import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./src/utils/db.js";

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

db();

app.listen(port, () => {
  console.log("Server is running on port : ", port);
});
