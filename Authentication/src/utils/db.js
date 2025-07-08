import mongoose from "mongoose";

const db = () => {
  mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(() => {
      console.log("Mongodb connected");
    })
    .catch((err) => {
      console.log("Mongodb not connected");
    });
};

export default db;
