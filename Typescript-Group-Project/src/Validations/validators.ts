import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be atleast 4 characters")
    .max(12, "Password must be at most 12 characters"),
  confirmPassword: Yup.string()
    .required("This field is required")
    .oneOf([Yup.ref("password")], "Passwords are not the same"),
});

export const loginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be atleast 4 characters")
    .max(12, "Password must be at most 12 characters"),
});
