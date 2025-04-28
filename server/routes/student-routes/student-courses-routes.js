import express from "express";
import getCoursesByStudentId from "../../controllers/student-controller/student-course-controller.js";

const router = express.Router();

router.get("/get/:studentId", getCoursesByStudentId);

export default router;
