import type { ReactNode } from "react";

export interface CustomBtnProps {
  label: string | ReactNode;
  type?: "submit" | "button";
  p?: string;
  size: string;
  width?: string;
  mt?: string;
  onClick?: () => void;
}

export interface CustomDelBtnProps {
  label: string | ReactNode;
  type?: "submit" | "button";
  p: string;
  size: string;
  width?: string;
  mt?: string;
  onClick?: () => void;
}

export interface CustomFormProps {
  header?: string;
  children?: React.ReactNode;
  onSubmit?: () => void;
}

export interface CustomInputProps {
  title?: string;
  type: string;
  nametag?: string;
  placeholder?: string;
  autoFocus?: boolean;
}

export interface ErrorMsgProps {
  children: React.ReactNode;
}

export interface TaskCardProps {
  header: string;
  timeline: string;
  data?: number;
  value: number;
  color: string;
}

export interface User {
  id: string;
  username: string;
  password: string | number;
  role: "user" | "admin";
  isLoggedin: boolean;
}

export type State = {
  users: User[];
  currentUser: User | null;
};

export interface RegisterPayload {
  username: string;
  password: string | number;
  role: "user" | "admin";
}

export interface LoginPayload {
  username: string;
  password: string | number;
  role: "user" | "admin";
}

export type LoginFormValues = {
  username: string;
  password: string;
};

export type RegisterFormValues = {
  username: string;
  password: string;
  confirmPassword: string;
};
