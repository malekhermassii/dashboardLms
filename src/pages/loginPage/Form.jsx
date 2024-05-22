// Importing necessary libraries and components
<<<<<<< HEAD
import { Box, Button, TextField, useMediaQuery} from "@mui/material";
=======
import { useState } from "react";
import { Box, Button, TextField, useMediaQuery, Typography, useTheme } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
>>>>>>> origin/main
import { Formik } from "formik"; // For handling form state and submission
import * as yup from "yup"; // For schema validation of form inputs
import { useNavigate } from "react-router-dom"; // To programmatically navigate to other routes
import { useDispatch } from "react-redux"; // To dispatch Redux actions
import { setLogin } from "../../state/index"; // Action to set login state in Redux
<<<<<<< HEAD
=======
import Dropzone from "react-dropzone"; // Component for drag and drop file upload

// Defining form validation schema using Yup
const registerSchema = yup.object().shape({
  name: yup.string().required("required "),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  image: yup.string().required("required"),
});

>>>>>>> origin/main
const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

<<<<<<< HEAD
=======
// Initial form values for the register form
const initialValuesRegister = {
  name: "",
  email: "",
  password: "",
  image: null,
};

>>>>>>> origin/main
// Initial form values for the login form
const initialValuesLogin = {
  email: "",
  password: "",
};
<<<<<<< HEAD
// Functional component for the Form
const Form = () => {
  // const [pageType, setPageType] = useState("login"); // Local state to toggle between login and register
  const dispatch = useDispatch(); // Redux's dispatch function
  const navigate = useNavigate(); // Hook for navigation
  const isNonMobile = useMediaQuery("(min-width:600px)"); // Check for non-mobile screen width
  // Function to handle login process
  const login = async (values, onSubmitProps) => {
    const response = await fetch("http://localhost:3002/loginAdmin", {
=======

// Functional component for the Form
const Form = () => {
  const [pageType, setPageType] = useState("login"); // Local state to toggle between login and register
  const dispatch = useDispatch(); // Redux's dispatch function
  const navigate = useNavigate(); // Hook for navigation
  const isNonMobile = useMediaQuery("(min-width:600px)"); // Check for non-mobile screen width
  const isLogin = pageType === "login"; // Boolean to check if current form is login
  const isRegister = pageType === "register"; // Boolean to check if current form is register

  // Function to handle registration process
  const register = async (values, onSubmitProps) => {
    const formData = new FormData(); // Form data object to handle file upload
    for (let key in values) {
      if (key === 'image' && values[key]) {
        formData.append('image', values.image, values.image.name); // Append image file to form data
      } else {
        formData.append(key, values[key]); // Append other form values
      }
    }
    const savedUserResponse = await fetch(
      "http://localhost:3002/users", {
        method: "POST",
        body: formData, // Send form data
        headers: {
          'Accept': 'application/json',
        },
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm(); // Reset form after submission

    if (savedUser) {
      setPageType("login"); // Switch to login after registration
    }
  };

  // Function to handle login process
  const login = async (values, onSubmitProps) => {
    const response = await fetch("http://localhost:3002/login", {
>>>>>>> origin/main
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const result = await response.json();
    onSubmitProps.resetForm();
    if (response.ok) {
      alert("login successfully")
      dispatch(setLogin({ user: result.user, token: result.token }));
      navigate("/home"); // Navigate to home on successful login
    } else {
      alert(result.message); // Show error message on failure
    }
  };

  // Function to decide which form submission handler to use
  const handleFormSubmit = async (values, onSubmitProps) => {
    await login(values, onSubmitProps);
  };

  // Form component structure using Formik for form handling
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={ initialValuesLogin }
      validationSchema={ loginSchema }
    >
      {({values,errors,handleBlur,handleChange,handleSubmit,setFieldValue,resetForm,})=> (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
<<<<<<< HEAD
=======
            {/* Conditional rendering for register form fields */}
            {isRegister && (
              <>
                <TextField
                  label="full Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={ Boolean(errors.name)}
                  helperText={ errors.name}
                  sx={{ gridColumn: "span 4" }}
                />
              
                <Box
                  gridColumn="span 4"
                  border={`1px solid #A3A3A3`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("image", acceptedFiles[0])
                    }
                  >
                    {/* getRootProps: A method that provides properties required to make the wrapping element (<Box> in this case) behave as a dropzone. This includes event handlers that manage the drag-and-drop functionality. */}
                    
                    {/* This is a method provided by the react-dropzone library. When called, it returns an object containing properties like type and event handlers that are necessary for the <input> element */}
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${"#ffd21f"}`}
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.image ? (
                          <p>Add image Here</p>
                        ) : (
                          <div style={{display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center"}}>
                            <Typography>{values.image.name}</Typography>
                            <EditOutlinedIcon />
                          </div>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}
>>>>>>> origin/main

            {/* Email and password fields common to both forms */}
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={ Boolean(errors.email)}
              helperText={ errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={ Boolean(errors.password)}
              helperText={ errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* Form submission buttons */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: "#ffd21f",
                color:"#FFFFFF",
                "&:hover": { color: "#ffd21f" },
              }}
            >
              LOGIN
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form; // Exports the Form component for use elsewhere in the app
