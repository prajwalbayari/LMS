export const signupFormControls = [
  {
    name: "userName",
    label: "Username",
    placeholder: "Enter your username",
    type: "text",
    componentType: "input",
  },
  {
    name: "userEmail",
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    componentType: "input",
  },
];

export const signinFormControls = [
  {
    name: "userEmail",
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    componentType: "input",
  },
];

export const initialSignInFormData = {
  userEmail: "",
  password: "",
};

export const initialSignUpFormData = {
  userName: "",
  userEmail: "",
  password: "",
};
