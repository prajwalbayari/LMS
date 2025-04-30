import mongoose from "mongoose";

const LecturesProgressSchema = new mongoose.Schema({
  lectureId: String,
  viewed: Boolean,
  dateViewed: Date,
});

const CourseProgress = new mongoose.Schema({
  userId: String,
  courseId: String,
  completed: Boolean,
  completionDate: Date,
  lecturesProgress: [LecturesProgressSchema],
});

const courseProgress = mongoose.model("CourseProgress", CourseProgress);

export default courseProgress;
