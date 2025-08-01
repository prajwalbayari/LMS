import express from "express";
import {
  getAllCourses,
  getCourseDetailsById,
  addNewCourse,
  updateCourseById,
  deleteCourseById,
} from "../../controllers/instructor-controller/course-controller.js";

const router = express.Router();

router.post("/add", addNewCourse);
router.get("/get/:id", getAllCourses);
router.get("/get/details/:id", getCourseDetailsById);
router.put("/update/:id", updateCourseById);
router.delete("/delete/:id", deleteCourseById);

export default router;
