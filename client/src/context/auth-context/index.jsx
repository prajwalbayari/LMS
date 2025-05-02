import { Skeleton } from "@/components/ui/skeleton";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuthService, loginService, registerService } from "@/services";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [auth, setAuth] = useState({
    authenticated: false,
    user: null,
  });
  const [loading, setLoading] = useState(true);

  async function handleRegisteredUser(event) {
    event.preventDefault();
    console.log(signUpFormData);
    try {
      const data = await registerService(signUpFormData);
      toast.success(data?.data?.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  }

  async function handleLoginUser(event) {
    event.preventDefault();
    try {
      const { data: response } = await loginService(signInFormData);
      console.log(response);
      if (response.success) {
        sessionStorage.setItem(
          "accessToken",
          JSON.stringify(response.data.accessToken)
        );
        setAuth({ authenticated: true, user: response.data.user });
        setLoading(false);
        toast.success(response?.message);
      } else {
        toast.error("Invalid credentials");
        setAuth({
          authenticated: false,
          user: null,
        });
      }
    } catch (error) {
      console.error("Login error: ", error);
      toast.error(error?.response?.data?.message);
      setAuth({
        authenticated: false,
        user: null,
      });
    } finally {
      setLoading(false);
    }
  }

  //Check authenticated user

  async function checkAuthUser() {
    try {
      const { data: response } = await checkAuthService();

      if (response.success) {
        setAuth({ authenticated: true, user: response.data.user });
        setLoading(false);
      } else {
        setAuth({ authenticated: false, user: null });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      if (!error?.response?.data?.success) {
        setAuth({ authenticated: false, user: null });
        setLoading(false);
      }
    }
  }

  function resetCredentials() {
    setAuth({
      authenticated: false,
      user: null,
    });
  }

  useEffect(() => {
    checkAuthUser();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        auth,
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisteredUser,
        handleLoginUser,
        resetCredentials,
      }}
    >
      {loading ? <Skeleton /> : children}
    </AuthContext.Provider>
  );
}
