import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  // token: null,
  courses: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    setLogin: (state, action) => {
      state.user = action.payload.user;
      // state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      // state.token = null;
    },
    setCourses: (state, action) => {
      state.courses = action.payload.courses;
    },
    setCourse: (state, action) => {
      const updatedCourses = state.courses.map((course) => {
        if (course._id === action.payload.course._id) return action.payload.course;
        return course;
      });
      state.courses = updatedCourses;
    },
  },
});

export const {  setLogin, setLogout,  setCourses, setCourse } =
  authSlice.actions;
export default authSlice.reducer;
// 20