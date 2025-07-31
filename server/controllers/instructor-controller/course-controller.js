import Course from "../../models/Course.js";
import StudentCourses from "../../models/StudentCourses.js";

const addNewCourse = async (req, res) => {
  try {
    const courseData = req.body;
    const newlyCreatedCourse = new Course(courseData);
    const saveCourse = await newlyCreatedCourse.save();
    if (saveCourse) {
      return res.status(201).json({
        success: true,
        message: "Course created successfully",
        data: saveCourse,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Some error occured!" });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const { id } = req.params;
    const courseList = await Course.find({ instructorId: id });

    res.status(200).json({
      success: true,
      data: courseList,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Some error occured!" });
  }
};

const getCourseDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const courseDetails = await Course.findById(id);
    if (!courseDetails) {
      res.status(404).json({
        success: false,
        message: "Course not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: courseDetails,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Some error occured!" });
  }
};

const updateCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCourseData = req.body;
    
    // Get the existing course to preserve student enrollment data
    const existingCourse = await Course.findById(id);
    if (!existingCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found!",
      });
    }

    // Remove students field from update data to preserve existing enrollments
    const { students, ...courseUpdateFields } = updatedCourseData;
    
    // Update course while preserving students array
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      {
        ...courseUpdateFields,
        students: existingCourse.students, // Preserve existing student enrollment data
      },
      { new: true }
    );

    // Update course details in StudentCourses model for all students who purchased this course
    await StudentCourses.updateMany(
      { "courses.courseId": id },
      {
        $set: {
          "courses.$.title": updatedCourse.title,
          "courses.$.instructorName": updatedCourse.instructorName,
          "courses.$.courseImage": updatedCourse.image,
        }
      }
    );

    res.status(200).json({
      success: true,
      message: "Course updated successfully!!",
      data: updatedCourse,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Some error occured!" });
  }
};

export { getAllCourses, getCourseDetailsById, addNewCourse, updateCourseById };
