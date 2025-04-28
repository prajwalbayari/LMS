import { GraduationCap, TvMinimalPlay } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";

function StudentViewCommonHeader() {
  const navigate = useNavigate();
  const { resetCredentials } = useContext(AuthContext);
  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }

  return (
    <header className="flex items-center justify-between p-4 border-b relative">
      <div className="flex items-center space-x-4  hover:text-black">
        <Link to="/home" className="flex items-center">
          <GraduationCap className="h-8 w-8 mr-4" />
          <span className="font-extrabold md:text-xl text-[14px]">
            LMS LEARN
          </span>
        </Link>
        <div className="flex items-center space-x-1 ">
          <Button
            variant="ghost"
            className="text-[14px] md:text-[16px] font-medium"
            onClick={() => navigate("/courses")}
          >
            Explore Courses
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-4 ">
        <div className="flex gap-4 items-center">
          <div
            onClick={() => navigate("/student-courses")}
            className="flex cursor-pointer items-center gap-3"
          >
            <span className="text-[14px] md:text-[16px] font-medium">
              My courses
            </span>
            <TvMinimalPlay className="w-8 h-8 cursor-pointer" />
          </div>
        </div>
        <Button onClick={handleLogout}>Sign Out</Button>
      </div>
    </header>
  );
}

export default StudentViewCommonHeader;
