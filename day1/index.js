import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 8080;

const app = express();

app.use(
  cors({
    origin: process.env.BASE_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send("App create successfully");
});

app.get("/home", (req, res) => {
  res.send("This is a home page");
});

app.get("/about", (req, res) => {
  res.send("This is a about page");
});

app.get("/tasincoder", (req, res) => {
  res.send("This is a Tasin Coder");
});

app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
