import express from "express";
import { getCurrentCourseProgress } from "../../controllers/student-controller/course-progress-controller.js";

const router = express.Router();

router.get("/get/:userId/:courseId", getCurrentCourseProgress);

export default router;
