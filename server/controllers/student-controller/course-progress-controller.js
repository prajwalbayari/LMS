import CourseProgress from "../../models/CourseProgress.js";
import Course from "../../models/Course.js";
import StudentCourses from "../../models/StudentCourses.js";

const markCurrentLecureAsViewd = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

const getCurrentCourseProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    const studentPurchasedCourses = await StudentCourses.findOne({ userId });

    if (!studentPurchasedCourses) {
      return res.status(404).json({
        success: false,
        message: "User has not purchased any courses yet.",
      });
    }

    const isCurrentCoursePurchasedByCurrentUser =
      studentPurchasedCourses?.courses?.findIndex(
        (item) => item?.courseId === courseId
      ) > -1;

    if (!isCurrentCoursePurchasedByCurrentUser) {
      return res.status(200).json({
        success: true,
        data: {
          isPurchased: false,
        },
        message: "You need to purchase a course to watch it",
      });
    }

    const currentUserCourseProgress = await CourseProgress.findOne({
      userId,
      courseId,
    }).populate("courseId");

    if (
      !currentUserCourseProgress ||
      currentUserCourseProgress?.lecturesProgress?.length === 0
    ) {
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "No progress found you can start watching course",
        data: {
          courseDetails: course,
          progress: [],
          isPurchased: true,
        },
      });
    }

    const courseDetails = await Course.findById(courseId);

    res.status(200).json({
      success: true,
      data: {
        courseDetails,
        progress: currentUserCourseProgress.lecturesProgress,
        completed: currentUserCourseProgress.completed,
        completionDate: currentUserCourseProgress.completionDate,
        isPurchased: true,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

const resetCurrentCourseProgress = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

export {
  markCurrentLecureAsViewd,
  resetCurrentCourseProgress,
  getCurrentCourseProgress,
};
