import express from "express";
import {
  getCurrentCourseProgress,
  markCurrentLecureAsViewed,
  resetCurrentCourseProgress,
} from "../../controllers/student-controller/course-progress-controller.js";

const router = express.Router();

router.get("/get/:userId/:courseId", getCurrentCourseProgress);
router.post("/mark-lecture-viewed", markCurrentLecureAsViewed);
router.post("/reset-progress", resetCurrentCourseProgress);

export default router;
