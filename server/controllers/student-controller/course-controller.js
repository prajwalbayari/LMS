import Course from "../../models/Course.js";

const getAllStudentViewCourses = async (req, res) => {
  try {
    const courseList = await Course.find({});

    if (courseList.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No course found",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Fetched course list",
      data: courseList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Could not load the courses",
    });
  }
};

const getStudentViewCourseDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const courseDetails = await Course.findById(id);

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "No course details found",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Fetched course details",
      data: courseDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Could not load the courses",
    });
  }
};

export { getStudentViewCourseDetails, getAllStudentViewCourses };
