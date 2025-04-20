import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { loginService, registerService } from "@/services";
import { createContext, useState } from "react";

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
    }
  }

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
