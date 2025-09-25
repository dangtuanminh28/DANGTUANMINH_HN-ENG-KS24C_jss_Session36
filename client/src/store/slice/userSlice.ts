import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUser = createAsyncThunk("getAllUser", async () => {
  try {
    const response = await axios.get("http://localhost:8080/users");
    return response.data;
  } catch (error) {
    console.log("Lỗi không thể lấy dữ liệu", error);
    return [];
  }
});
export const deleteUser = createAsyncThunk("deleteUser", async(id:number) => {
  try {
    const response = await axios.delete(`http://localhost:8080/users/${id}`);
    console.log(response);
    
    return id;
  } catch (error) {
    console.log("Error", error);
    
  }
});
const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [
      {
        id: 1,
        name: "Minh Thu",
        email: "thu@gmail.com",
      },
    ],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.pending, () => {
        console.log("Đang đợi xử lý");
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        console.log("Xử lý thành công");
        state.users = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action)=>{
        state.users=state.users.filter(u=>u.id!==action.payload)
      })
  },
});
export default userSlice.reducer;
