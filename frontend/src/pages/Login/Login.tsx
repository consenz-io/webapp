import "./Login.css";
import { Box, Container } from "@mui/system";
import { MainLogin } from "../../components/styles/LoginForm.styles";
import LoginButton from "../../components/LoginButton/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";

function Login() {
  const { loginWithRedirect, logout } = useAuth0();
  return (
    <div className="container">
      <Box>
        <Container>
          <MainLogin>
            <header>
              <h1>sign in to start agreeing!</h1>
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
