import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  loading: false,
  AllTask: [],
};

export const taskDetailsSlice = createSlice({
  name: "TaskDetails",
  initialState,
  reducers: {
    getTaskDetails: (state, action) => {
      state.AllTask = action.payload;
      state.status = "succeeded";
    },
  },
});

export const { getTaskDetails } = taskDetailsSlice.actions;

export const selectTaskDetailsData = (state) =>
  state.TaskDetails.AllTask;

export default taskDetailsSlice.reducer;