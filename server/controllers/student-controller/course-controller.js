import Course from "../../models/Course.js";
import StudentCourses from "../../models/StudentCourses.js";

const getAllStudentViewCourses = async (req, res) => {
  try {
    const {
      category = [],
      level = [],
      primaryLanguage = [],
      sortBy = "price-lowtohigh",
    } = req.query;

    let filters = {};
    if (category.length) {
      filters.category = { $in: category.split(",") };
    }
    if (level.length) {
      filters.level = { $in: level.split(",") };
    }
    if (primaryLanguage.length) {
      filters.primaryLanguage = { $in: primaryLanguage.split(",") };
    }

    let sortParam = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sortParam.pricing = 1;
        break;
      case "price-hightolow":
        sortParam.pricing = -1;
        break;
      case "title-atoz":
        sortParam.title = 1;
        break;
      case "title-ztoa":
        sortParam.title = -1;
        break;
      default:
        sortParam.pricing = 1;
        break;
    }
    const courseList = await Course.find(filters).sort(sortParam);

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
    const { id, studentId } = req.params;
    const courseDetails = await Course.findById(id);

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "No course details found",
        data: null,
      });
    }

    const studentCourse = await StudentCourses.findOne({
      userId: studentId,
    });

    const ifStudentAlreadyBoughtCurrentCourse =
      studentCourse.courses.findIndex((item) => item.courseId === id) > -1;

    res.status(200).json({
      success: true,
      message: "Fetched course details",
      data: courseDetails,
      coursePurchaseId: ifStudentAlreadyBoughtCurrentCourse ? id : null,
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
