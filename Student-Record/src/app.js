import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import studentRoutes from "./routes/student.routes.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CORS_URL,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Helth Check OK");
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/students", studentRoutes);

export default app;
