// import Home from "./pages/Home";
// import LoginPage from "./pages/loginPage";

// function App() {
//   return <LoginPage/>;
// }

// export default App;
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/loginPage";
import SingleCourse from './pages/singleCourse';
import ProfilePage from "./pages/profile";
import TestCourse from "./pages/courseTest";
import { useSelector } from "react-redux";

import AllCourses from "./pages/allCourses"

function App() {
  // const mode = useSelector((state) => state.mode);
  // const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isVerified = Boolean(useSelector((state) => state.token));
  return (
    <div className="app">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/courses" element={isVerified ?<AllCourses /> : <Navigate to="/" /> } />
            <Route path="/courses/:courseId" element={isVerified ?<SingleCourse /> :  <Navigate to="/" /> } />
            <Route
              path="/home"
              element={isVerified ? <Home /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isVerified ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/tests/:courseId"
              element={isVerified ? <TestCourse /> : <Navigate to="/" />}
            />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
// form validation
