import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  loading: false,
  AllProject: [],
};

export const projectDetailsSlice = createSlice({
  name: "ProjectDetails",
  initialState,
  reducers: {
    getProjectDetails: (state, action) => {
      state.AllProject = action.payload;
      state.status = "succeeded";
    },
  },
});

export const { getProjectDetails } = projectDetailsSlice.actions;

export const selectProjectDetailsData = (state) =>
  state.ProjectDetails.AllProject;

export default projectDetailsSlice.reducer;