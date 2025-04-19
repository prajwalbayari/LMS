import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { registerService } from "@/services";
import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);

  async function handleRegisteredUser(event) {
    event.preventDefault();
    const data = await registerService(signUpFormData);
    console.log(data);
  }

  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisteredUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
