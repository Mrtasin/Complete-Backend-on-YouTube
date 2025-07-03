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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("App create successfully");
});

const registerUser = (req, res) => {
  const { name, email, password } = req.body;
  console.log(`Name : - ${name}`);
  console.log(`Email : - ${email}`);
  console.log(`Password : - ${password}`);

  const id = req.params?.id;
  console.log(`User id :- ${id}`);

  res.status(201).json({
    message: "Register Successfully",
  });
};

app.post("/register/:id", registerUser);

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
