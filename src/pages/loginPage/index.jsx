import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="#ffd21f">
          Rouem LMS
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "80%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
        boxShadow="9px 4px 23px -8px rgba(156,148,156,1)"
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Rouem learning managment system !
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
