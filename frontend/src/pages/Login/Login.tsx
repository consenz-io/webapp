import "./Login.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Container } from "@mui/system";
import { MainLogin } from "../../components/styles/LoginForm.styles";
import { Typography } from "@mui/material";
import LoginButton from "components/LoginButton/LoginButton";
import { useTranslation } from "react-i18next";
import { StringBank } from "strings";

function Login() {
  const { loginWithRedirect, logout } = useAuth0();
  const {t} = useTranslation();
  return (
    <div className="container">
      <Box>
        <Container>
          <MainLogin>
            <header>
              <Typography variant="h1">
                {t(StringBank.LOGIN_TAGLINE)}
              </Typography>
            </header>
            <LoginButton
              btnTitle="Sign In"
              clickFn={loginWithRedirect}
            ></LoginButton>
            <LoginButton btnTitle="Log Out" clickFn={logout}></LoginButton>
          </MainLogin>
        </Container>
      </Box>
    </div>
  );
}

export default Login;
