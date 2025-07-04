import express from "express";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 8080;

const app = express();

app.listen(port, () => {
  console.log("Server is running on port : ", port);
});
