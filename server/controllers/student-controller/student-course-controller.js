import StudentCourses from "../../models/StudentCourses.js";

const getCoursesByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;
    const stundentCoursesBought = await StudentCourses.findOne({
      userId: studentId,
    });

    return res.status(200).json({
      success: true,
      data: stundentCoursesBought?.courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

export default getCoursesByStudentId;
