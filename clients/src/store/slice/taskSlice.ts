import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Task {
  id: number;
  taskName: string;
  completed: boolean;
  priority: "LOW" | "MEDIUM" | "HIGH";
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

const API_URL = "http://localhost:8080/tasks";

export const fetchTasks = createAsyncThunk("tasks/fetch", async () => {
  const res = await axios.get(API_URL);
  return res.data as Task[];
});

export const addTask = createAsyncThunk(
  "tasks/add",
  async (task: Omit<Task, "id">) => {
    const res = await axios.post(API_URL, task);
    return res.data as Task;
  }
);

export const toggleTask = createAsyncThunk(
  "tasks/toggle",
  async (task: Task) => {
    const res = await axios.patch(`${API_URL}/${task.id}`, {
      completed: !task.completed,
    });
    return res.data as Task;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/update",
  async (task: Task) => {
    const res = await axios.put(`${API_URL}/${task.id}`, task);
    return res.data as Task;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Fetch failed";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(toggleTask.fulfilled, (state, action) => {
        const idx = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (idx >= 0) state.tasks[idx] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const idx = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (idx >= 0) state.tasks[idx] = action.payload;
      });
  },
});

export default taskSlice.reducer;
