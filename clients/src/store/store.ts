// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slice/taskSlice";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
