import CommonForm from "@/components/common-form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signinFormControls, signupFormControls } from "@/config";
import { TabsContent } from "@radix-ui/react-tabs";
import { GraduationCap } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin");

  function handleTabChange(value) {
    setActiveTab(value);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link to={"/"} className="flex items-center justify-center">
          <GraduationCap className="h-8 w-8 mr-4" />
          <span className="font-extrabold text-xl">LMS LEARN</span>
        </Link>
      </header>
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Tabs
          value={activeTab}
          defaultValue="signin"
          onValueChange={handleTabChange}
          className="w-full max-w-md"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <div className="mt-4 overflow-hidden" style={{ minHeight: "400px" }}>
            {" "}
            <TabsContent
              value="signin"
              className="transition-all duration-300 ease-in-out"
            >
              <CommonForm formControls={signinFormControls} />
            </TabsContent>
            <TabsContent
              value="signup"
              className="transition-all duration-300 ease-in-out"
            >
              <CommonForm formControls={signupFormControls} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

export default AuthPage;
