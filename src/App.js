// import Home from "./pages/Home";
// import LoginPage from "./pages/loginPage";

// function App() {
//   return <LoginPage/>;
// }

// export default App;
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/loginPage";
// import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import AllCourses from "./pages/allCourses"

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isVerified = Boolean(useSelector((state) => state.token));
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}> 
       <CssBaseline />
          <Routes>
            {/*  const handleNavigation = () => {
    navigate('/courses');
  }; */}
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<AllCourses />} />
            <Route
              path="/home"
              element={isVerified ? <Home /> : <Navigate to="/" />}
            />
            {/* <Route
              path="/profile/:userId"
              element={isVerified ? <ProfilePage /> : <Navigate to="/" />}
            /> */}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
// form validation
