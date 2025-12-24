import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import taskSlice from "../features/tasks/taskSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    task: taskSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
