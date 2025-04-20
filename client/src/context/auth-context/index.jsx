import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuthService, loginService, registerService } from "@/services";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [auth, setAuth] = useState({
    authenticate: false,
    user: null,
  });

  async function handleRegisteredUser(event) {
    event.preventDefault();
    const data = await registerService(signUpFormData);
    console.log(data);
  }

  async function handleLoginUser(event) {
    event.preventDefault();
    const { data: response } = await loginService(signInFormData);
    console.log(response);
    if (response.success) {
      sessionStorage.setItem(
        "accessToken",
        JSON.stringify(response.data.accessToken)
      );
      setAuth({ authenticate: true, user: response.data.user });
    } else {
      setAuth({
        authenticate: false,
        user: null,
      });
    }
  }

  //Check authenticated user
  async function checkAuthUser() {
    const { data: response } = await checkAuthService();

    if (response.success) {
      setAuth({ authenticate: true, user: response.data.user });
    } else {
      setAuth({ authenticate: false, user: null });
    }
  }

  useEffect(() => {
    checkAuthUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisteredUser,
        handleLoginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
