import "./config/env.js";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth-routes/index.js";
import mediaRoutes from "./routes/instructor-routes/media-routes.js";
import instructorCourseRoutes from "./routes/instructor-routes/course-routes.js";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
//DATBASE CONNECTION

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Mongodb is connected successfully!!"))
  .catch((e) => console.log(e));

//Route configuration
app.use("/auth", authRoutes);
app.use("/media", mediaRoutes);
app.use("/instructor/course", instructorCourseRoutes);

//Global error handler
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
