import CommonForm from "@/components/common-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  initialSignInFormData,
  initialSignUpFormData,
  signinFormControls,
  signupFormControls,
} from "@/config";
import { AuthContext } from "@/context/auth-context";
import { TabsContent } from "@radix-ui/react-tabs";
import { GraduationCap } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin");
  const {
    signInFormData,
    setSignInFormData,
    signUpFormData,
    setSignUpFormData,
    handleRegisteredUser,
    handleLoginUser,
  } = useContext(AuthContext);

  function handleTabChange(value) {
    setSignInFormData(initialSignInFormData);
    setSignUpFormData(initialSignUpFormData);
    setActiveTab(value);
  }

  function checkIfSignInFormIsValid() {
    return (
      signInFormData &&
      /^[a-zA-Z0-9.]+@gmail\.com$/.test(signInFormData.userEmail) &&
      signInFormData.password.length >= 6
    );
  }

  function checkIfSignUpFormIsValid() {
    return (
      signUpFormData &&
      signUpFormData.userName !== "" &&
      signUpFormData.password.length >= 6 &&
      /^[a-zA-Z0-9.]+@gmail\.com$/.test(signUpFormData.userEmail)
    );
  }

  useEffect(() => {
    setSignInFormData(initialSignInFormData);
    setSignUpFormData(initialSignUpFormData);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link to={"/"} className="flex items-center justify-center">
          <GraduationCap className="h-8 w-8 mr-4" />
          <span className="font-extrabold text-xl">LMS LEARN</span>
        </Link>
      </header>
      <div className="flex items-center justify-center min-h-screen bg-background px-4">
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
          <TabsContent
            value="signin"
            className="transition-all duration-300 ease-in-out"
          >
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Sign in to your account</CardTitle>
                <CardDescription>
                  Enter your email and password to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CommonForm
                  formControls={signinFormControls}
                  buttonText={"Sign In"}
                  formData={signInFormData}
                  setFormData={setSignInFormData}
                  isButtonDisabled={!checkIfSignInFormIsValid()}
                  handleSumbit={handleLoginUser}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent
            value="signup"
            className="transition-all duration-300 ease-in-out"
          >
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Create a new account</CardTitle>
                <CardDescription>
                  Enter your details to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CommonForm
                  formControls={signupFormControls}
                  buttonText={"Sign Up"}
                  formData={signUpFormData}
                  setFormData={setSignUpFormData}
                  isButtonDisabled={!checkIfSignUpFormIsValid()}
                  handleSumbit={handleRegisteredUser}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AuthPage;
