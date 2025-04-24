import mongoose from "mongoose";

const LectureSchema = new mongoose.Schema({
  title: String,
  videoURL: String,
  public_id: String,
  freePreview: Boolean,
});

const CourseSchema = new mongoose.Schema({
  instructoId: String,
  instructoName: String,
  date: Date,
  title: String,
  category: String,
  level: String,
  primaryLanguage: String,
  subtitle: String,
  description: String,
  image: String,
  welcomeMessage: String,
  pricing: Number,
  objectives: String,
  stundets: [
    {
      studentId: String,
      studentName: String,
      studentEmail: String,
    },
  ],
  curriculum: [LectureSchema],
  isPublished: Boolean,
});

const schema = mongoose.model("Course", CourseSchema);
export default schema;
