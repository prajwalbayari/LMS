import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import { deleteCourseService } from "@/services";
import { Edit, Trash2, Loader2 } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

function InstructorCourses({ listOfCourses, onCourseDeleted }) {
  const {
    setCourseLandingFormData,
    setCourseCurriculumFormData,
    setCurrentEditedCourseId,
  } = useContext(InstructorContext);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  function openDeleteDialog(courseId, courseTitle) {
    setCourseToDelete({ id: courseId, title: courseTitle });
    setDeleteDialogOpen(true);
  }

  async function handleDeleteCourse() {
    if (!courseToDelete) return;

    setIsDeleting(true);
    try {
      const response = await deleteCourseService(courseToDelete.id);
      if (response?.success) {
        toast({
          title: "Success",
          description: "Course deleted successfully!",
          variant: "default",
        });
        // Refresh the course list
        if (onCourseDeleted) {
          onCourseDeleted();
        }
        // Redirect to All courses section (dashboard tab stays on courses)
        setDeleteDialogOpen(false);
        setCourseToDelete(null);
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      toast({
        title: "Error",
        description: "Failed to delete course. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  }
  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="text-3xl font-extrabold">All courses</CardTitle>
        <Button
          onClick={() => {
            setCurrentEditedCourseId(null);
            setCourseCurriculumFormData(courseCurriculumInitialFormData);
            setCourseLandingFormData(courseLandingInitialFormData);
            navigate("/instructor/create-new-course");
          }}
          className="p-6"
        >
          Create new course
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listOfCourses && listOfCourses.length > 0
                ? listOfCourses.map((course) => (
                    <TableRow key={course._id}>
                      <TableCell className="font-medium">
                        {course?.title}
                      </TableCell>
                      <TableCell>{course?.students?.length}</TableCell>
                      <TableCell>
                        ${course?.students?.length * course?.pricing}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          onClick={() => {
                            navigate(`/instructor/edit-course/${course?._id}`);
                          }}
                          variant="ghost"
                          size="sm"
                        >
                          <Edit className="h-6 w-6" />
                        </Button>
                        <Button 
                          onClick={() => openDeleteDialog(course?._id, course?.title)}
                          variant="ghost" 
                          size="sm"
                          className="hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-6 w-6" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-red-600">Delete Course</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{courseToDelete?.title}"? 
              <br />
              <br />
              <span className="font-medium text-red-600">
                This action cannot be undone and will:
              </span>
              <ul className="mt-2 text-sm list-disc list-inside space-y-1">
                <li>Remove the course permanently</li>
                <li>Remove it from all students who purchased it</li>
                <li>Delete all student progress data</li>
              </ul>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false);
                setCourseToDelete(null);
              }}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteCourse}
              disabled={isDeleting}
              className="min-w-[100px]"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Course"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export default InstructorCourses;
