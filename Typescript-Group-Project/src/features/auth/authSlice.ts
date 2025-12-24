import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type {
  LoginPayload,
  RegisterPayload,
  State,
  User,
} from "../../types/types";

const usersJSON: string = localStorage.getItem("usersAuth") || "[]";
const usersFromStorage: User[] = JSON.parse(usersJSON) || [];

const currentJSON: string = localStorage.getItem("currentUser") || "null";
const currentFromStorage: User | null = JSON.parse(currentJSON);

const initialState: State = {
  users: usersFromStorage,
  currentUser: currentFromStorage,
};

const authSlice = createSlice({
  initialState,
  name: "users",
  reducers: {
    register(state, action: { payload: RegisterPayload }) {
      const { username, password, role } = action.payload;
      const exists = state.users.find(
        (user) => user.username === username && user.role === role
      );
      if (exists) return;

      const newUser: User = {
        id: nanoid(),
        username,
        password,
        role,
        isLoggedin: true,
      };

      state.users.push(newUser);
      state.currentUser = newUser;

      localStorage.setItem("usersAuth", JSON.stringify(state.users));
      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
    },

    login(state, action: { payload: LoginPayload }) {
      const { username, password, role } = action.payload;
      const foundUser = state.users.find(
        (user) =>
          user.username === username &&
          user.password === password &&
          user.role === role
      );

      if (!foundUser) {
        state.currentUser = null;
        return;
      }

      state.currentUser = foundUser;
      state.currentUser.isLoggedin = true;

      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
    },

    logOut(state) {
      const currentUserId = state.currentUser?.id;
      state.currentUser = null;

      state.users = state.users.map((user) =>
        user.id === currentUserId ? { ...user, isLoggedin: false } : user
      );

      localStorage.removeItem("currentUser");
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    deleteUser(state, action: PayloadAction<string>) {
      const userId = action.payload;

      if (state.currentUser?.id === userId) {
        state.currentUser = null;
        localStorage.removeItem("currentUser");
      }

      state.users = state.users.filter((user) => user.id !== userId);

      localStorage.setItem("usersAuth", JSON.stringify(state.users));
    },
  },
});

export default authSlice;
export const { register, login, logOut, deleteUser, setCurrentUser } =
  authSlice.actions;
