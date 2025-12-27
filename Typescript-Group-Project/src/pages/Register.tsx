import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../Validations/validators";

import CustomBtn from "../components/CustomBtn";
import CustomForm from "../components/CustomForm";
import CustomInput from "../components/CustomInput";
import Error from "../components/ErrorMsg";

import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { register as registerAction } from "../features/auth/authSlice";
import { setCurrentUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import type { RegisterFormValues } from "../types/types";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [registerError, setRegisterError] = useState("");

  const searchParams = new URLSearchParams(location.search);
  const role = searchParams.get("role") as "user" | "admin" | null;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    try {
      setRegisterError("");

      const usersJSON = localStorage.getItem("usersAuth") || "[]";
      const users: { username: string; password: string; role: string }[] =
        JSON.parse(usersJSON);

      const exists = users.find(
        (u) => u.username === data.username && u.role === role
      );
      if (exists) throw "User with this username and role already exists";

      const newUser = {
        username: data.username,
        password: data.password,
        role: role || "user",
      };

      users.push(newUser);
      localStorage.setItem("usersAuth", JSON.stringify(users));
      toast.success("User created successfully");

      dispatch(registerAction(newUser));
      dispatch(setCurrentUser(newUser));

      reset();
      navigate("/");
    } catch (err: any) {
      setRegisterError(String(err));
    }
  };

  return (
    <CustomForm
      header={`Register as ${role?.toUpperCase() || ""}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <CustomInput
        title="Username"
        type="text"
        nametag="username"
        {...register("username")}
      />
      {errors.username && <Error>{errors.username.message}</Error>}
      {registerError && <Error>{registerError}</Error>}

      <CustomInput
        title="Password"
        type="password"
        nametag="password"
        {...register("password")}
      />
      {errors.password && <Error>{errors.password.message}</Error>}

      <CustomInput
        title="Confirm Password"
        type="password"
        nametag="confirmPassword"
        {...register("confirmPassword")}
      />
      {errors.confirmPassword && (
        <Error>{errors.confirmPassword.message}</Error>
      )}

      <CustomBtn
        label="Submit"
        type="submit"
        width="w-[300px]"
        p="py-2"
        size="text-[24px]"
        mt="mt-8"
      />
      <p className="mt-2">
        Already have an account?{" "}
        <Link
          className="text-[#5051f4] hover:text-[#7678f5] transition .4 "
          to={`/login?role=${role}`}
        >
          Login
        </Link>
      </p>
    </CustomForm>
  );
};

export default Register;
