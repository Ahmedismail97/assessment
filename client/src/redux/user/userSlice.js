import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("/api/users");
  return response.data;
});

export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData) => {
    const response = await axios.post("/api/users", userData);
    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ _id, userData }) => {
    const response = await axios.put(`/api/users/${_id}`, userData);
    return response.data;
  }
);

export const deleteUser = createAsyncThunk("users/deleteUser", async (_id) => {
  await axios.delete(`/api/users/${_id}`);
  return _id;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.status = "loading";
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [createUser.fulfilled]: (state, action) => {
      state.data.push(action.payload);
    },
    [updateUser.fulfilled]: (state, action) => {
      const { _id, userData } = action.meta.arg;
      const userIndex = state.data.findIndex((user) => user._id === _id);
      if (userIndex !== -1) {
        state.data[userIndex] = { ...state.data[userIndex], ...userData };
      }
    },
    [deleteUser.fulfilled]: (state, action) => {
      const _id = action.payload;
      state.data = state.data.filter((user) => user._id !== _id);
    },
  },
});

export default userSlice.reducer;
