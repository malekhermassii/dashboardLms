
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import Home from "./components/Home";
import AddCourse from "./pages/add pages/addCourse" ;
import AddUser from "./pages/add pages/addUser" ; 
import AdminList from "./pages/lists pages/AdminList";
import FeedbackList from "./pages/lists pages/FeedbackList" ; 
import { useSelector } from "react-redux";
import AddAdmin from "./pages/add pages/addAdmin";
import AddTest from "./pages/add pages/addTest";
import AddFeedback from "./pages/add pages/addFeedback";
import AddEnrollement from "./pages/add pages/addEnrollement";
import UserList from "./pages/lists pages/userList";
import CoursesList from "./pages/lists pages/courseList";
import EnrollmentsList from "./pages/lists pages/enrollementList";
import TestsList from "./pages/lists pages/testsList";
// update
import UpdateAdmin from "./pages/update pages/updateAdmin";
import UpdateCourse from "./pages/update pages/updateCourse";
import UpdateUser from "./pages/update pages/updateUser";
// import UpdateEnrollement from "./pages/update pages/updateEnrollement";
import UpdateFeedback from "./pages/update pages/updateFeedback";
import ViewAdmin from "./pages/view pages/viewAdmin";
import ViewUser from "./pages/view pages/viewUser";
import ViewEnrollement from "./pages/view pages/viewEnrollement";
import ViewFeedback from "./pages/view pages/viewFeedback";
import ViewCourse from "./pages/view pages/viewCourse";
import ViewTest from "./pages/view pages/viewTest";
import UpdateTest from "./pages/update pages/updateTest";
import AddTeacher from "./pages/add pages/addTeacher";
import TeacherList from "./pages/lists pages/TeacherList";
import UpdateTeacher from "./pages/update pages/updateTeacher";
import ViewTeacher from "./pages/view pages/viewTeacher";
// view


function App() {
  const isVerified = Boolean(useSelector((state) => state.token));
  return (
    <div className="app">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={isVerified ?<Home /> : <Navigate to="/" /> } />
            <Route path="/addUser" element={isVerified ?<AddUser /> : <Navigate to="/" /> } />
            <Route path="/addTest" element={isVerified ?<AddTest /> : <Navigate to="/" /> } />
            <Route path="/addAdmin" element={isVerified ?<AddAdmin /> : <Navigate to="/" /> } />
            <Route path="/addTeacher" element={isVerified ?<AddTeacher /> : <Navigate to="/" /> } />
            <Route path="/addFeedback" element={isVerified ?<AddFeedback /> : <Navigate to="/" /> } />
            <Route path="/addCourse" element={isVerified ?<AddCourse /> : <Navigate to="/" /> } />
            <Route path="/addEnrollement" element={isVerified ?<AddEnrollement /> : <Navigate to="/" /> } />
            <Route path="/usersList" element={isVerified ?<UserList /> : <Navigate to="/" /> } />
            <Route path="/adminsList" element={isVerified ?<AdminList /> : <Navigate to="/" /> } />
            <Route path="/TestsList" element={isVerified ?<TestsList /> : <Navigate to="/" /> } />
            <Route path="/feedbacksList" element={isVerified ?<FeedbackList /> : <Navigate to="/" /> } />
            <Route path="/coursesList" element={isVerified ?<CoursesList /> : <Navigate to="/" /> } />
            <Route path="/teachersList" element={isVerified ?<TeacherList/> : <Navigate to="/" /> } />
            <Route path="/enrollementsList" element={isVerified ?<EnrollmentsList /> : <Navigate to="/" /> } />
            <Route path="/updateAdmin/:adminId" element={isVerified ?<UpdateAdmin /> : <Navigate to="/" /> } />
            <Route path="/UpdateUser/:userId" element={isVerified ?<UpdateUser /> : <Navigate to="/" /> } />
            <Route path="/UpdateCourse/:courseId" element={isVerified ?<UpdateCourse /> : <Navigate to="/" /> } />
            <Route path="/UpdateCourse/:teacherId" element={isVerified ?<UpdateTeacher /> : <Navigate to="/" /> } />
            <Route path="/UpdateTest/:testId" element={isVerified ?<UpdateTest /> : <Navigate to="/" /> } />
            {/* <Route path="/UpdateEnrollement/:enrollId" element={isVerified ?<UpdateEnrollement /> : <Navigate to="/" /> } /> */}
            <Route path="/UpdateFeedback/:feedbackId" element={isVerified ?<UpdateFeedback /> : <Navigate to="/" /> } />
            <Route path="/ViewAdmin/:adminId" element={isVerified ?<ViewAdmin /> : <Navigate to="/" /> } />
            <Route path="/ViewUser/:userId" element={isVerified ?<ViewUser /> : <Navigate to="/" /> } />
            <Route path="/ViewEnrollement/:enrollId" element={isVerified ?<ViewEnrollement /> : <Navigate to="/" /> } />
            <Route path="/ViewFeedback/:feedbackId" element={isVerified ?<ViewFeedback /> : <Navigate to="/" /> } />
            <Route path="/ViewCourse/:courseId" element={isVerified ?<ViewCourse /> : <Navigate to="/" /> } />
            <Route path="/ViewTest/:testId" element={isVerified ?<ViewTest /> : <Navigate to="/" /> } />
            <Route path="/ViewTeacher/:teacherId" element={isVerified ?<ViewTeacher /> : <Navigate to="/" /> } />

            <Route
              path="/home"
              element={isVerified ? <Home /> : <Navigate to="/" />}
            />

          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
// form validation
