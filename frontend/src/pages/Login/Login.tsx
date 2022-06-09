import "./Login.css";
import { Box, Container, styled } from "@mui/system";
import {
  FormLogin,
  MainLogin,
  ParagraphLogin,
} from "../../components/styles/LoginForm.styles";
import { Link } from "@mui/material";
import LoginButton, {
  LoginFooterButton,
} from "../../components/LoginButton/LoginButton";
import Auth0LoginButton from "./Auth0Button/Auth0Button";
import { useAuth0 } from "@auth0/auth0-react";
function googleLogin() {
  console.log("clicked google sign in ");
}

const Input = styled("input")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "10px",
  width: "360px",
  height: "42px",
  background: " #292d36",
  border: "1px solid #595f68",
  borderRadius: "4px",
  color: "white",
});

const Label = styled("label")({
  fontFamily: "Lato",
  color: "#adb2b8",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "12px",
  lineHeight: "22px",
});

function Login() {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="container">
      <Box>
        <Container>
          <MainLogin>
            <header>
              <h1>sign in to start agreeing!</h1>
            </header>
            <FormLogin>
              <ParagraphLogin id="username">
                <Label htmlFor="username">USERNAME</Label>
                <Input type="text" name="username"></Input>
              </ParagraphLogin>
              <ParagraphLogin id="password">
                <Label htmlFor="password">PASSWORD</Label>
                <Input type="password" name="password"></Input>
              </ParagraphLogin>
              <ParagraphLogin id="buttons">
                <LoginButton
                  btnTitle="Sign In"
                  clickFn={loginWithRedirect}
                ></LoginButton>
                <Link href="#">Forgot Password?</Link>
              </ParagraphLogin>
            </FormLogin>
            <footer>
              <LoginFooterButton
                clickFn={googleLogin}
                btnTitle="Continue with Google"
              ></LoginFooterButton>
            </footer>
          </MainLogin>
        </Container>
      </Box>
      <Auth0LoginButton></Auth0LoginButton>
    </div>
  );
}

export default Login;
