import dotenv from "dotenv"
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
dotenv.config()

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

cors({
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
});
//DATBASE CONNECTION

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Mongodb is connected successfully!!"))
  .catch((e) => console.log(e));

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrrong!!",
  });
});

app.listen(PORT, () => {
  console.log(`Server is now running on the port ${PORT}`);
});
