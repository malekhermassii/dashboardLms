import { createSlice } from "@reduxjs/toolkit";
// Defines the initial state of the auth section of the Redux store.
const initialState = {
  user: null,   // Initially, there is no user logged in.
  token: null,  // No authentication token initially.
  courses: [],  // An empty array to store course information.
  feedbacks : []
};
// Creates a slice for authentication with a set of reducers to handle actions.
export const authSlice = createSlice({
  name: "auth",          // Name of the slice, used in action types.
  initialState,          // Initial state for this slice.
  reducers: {
    // Handles user login, setting the user and token based on action payload.
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;  // Assumes token is managed securely.
    },
    // Handles user logout, resetting user and token to initial state.
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    // Updates user details with new data from action payload.
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    // Sets the courses array to the list provided in the action payload.
    setCourses: (state, action) => {
      console.log('Before setting courses:', state.courses);
      state.courses = action.payload.courses;
      console.log('After setting courses:', state.courses);
  },
    // Updates a specific course based on matching ID and action payload data.
    setCourse: (state, action) => {
      state.courses = state.courses.map((course) => {
        if (course._id === action.payload.course._id) {
          return action.payload.course;
        }
        return course;
      });
    },
    // Adds a new course to the courses array.
    addCourse: (state, action) => {
      const courseExists = state.courses.some(course => course._id === action.payload._id);
      if (!courseExists) {
          state.courses.push(action.payload);
      }
  },
   // New actions for managing feedback
   setFeedbacks: (state, action) => {
    state.feedbacks = action.payload.feedbacks;
  },
  addFeedback: (state, action) => {
    state.feedbacks.push(action.payload);
  }
  },
});

// Exports the actions created by createSlice for use elsewhere in the app.
export const { setLogin, setLogout, updateUser, setCourses, setCourse, addCourse , addFeedback , setFeedbacks} = authSlice.actions;

// The default export is the reducer for this slice of state.
export default authSlice.reducer;




// createSlice ,
//  slice (postion(partie)), 
// reducers , 
// action , 
// action.payload
// rouem (name : roumi , email : rouem@gmail.com , password : qwerty1234)