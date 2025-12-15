import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../Validations/validators";

import CustomBtn from "../components/CustomBtn";
import CustomForm from "../components/CustomForm";
import CustomInput from "../components/CustomInput";
import Error from "../components/ErrorMsg";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { setCurrentUser } from "../features/auth/authSlice";

type LoginFormValues = {
  username: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const role = (searchParams.get("role") as "user" | "admin") || "user";

  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    try {
      setLoginError("");

      const usersJSON = localStorage.getItem("usersAuth") || "[]";
      const users: {
        username: string;
        password: string;
        role: "user" | "admin";
      }[] = JSON.parse(usersJSON);

      const user = users.find(
        (u) =>
          u.username === data.username &&
          u.password === data.password &&
          u.role === role
      );

      if (!user) {
        throw "Invalid username, password, or role";
      }

      dispatch(setCurrentUser(user));
      navigate("/");
      reset();
    } catch (err: any) {
      setLoginError(String(err));
    }
  };

  return (
    <CustomForm header={`Login as ${role}`} onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        title="Username"
        type="text"
        nametag="username"
        {...register("username")}
      />
      {errors.username && <Error>{errors.username.message}</Error>}
      {loginError && <Error>{loginError}</Error>}

      <CustomInput
        title="Password"
        type="password"
        nametag="password"
        {...register("password")}
      />
      {errors.password && <Error>{errors.password.message}</Error>}

      <CustomBtn
        label="Submit"
        type="submit"
        width="w-[300px]"
        p="py-2"
        color="[#5051f4]"
        size="text-[24px]"
        mt="mt-8"
      />
    </CustomForm>
  );
};

export default Login;
