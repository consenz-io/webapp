import "./Login.css";
import auth from "../auth/auth";
import { FooterButton } from "../styles/Button.styles";
import {
  FormLableLogin,
  FormLogin,
  InputLogin,
  MainLogin,
  ParagraphLogin,
  SigninButton,
} from "../styles/LoginForm.styles";

function login(e: any) {
  e.preventDefault();
  auth.alternate();
  console.log("current auth state:", auth.getAuth());
}

function Login() {
  return (
    <div id="container">
      <MainLogin>
        <header>
          <h1>sign in to start agreeing!</h1>
        </header>
        <FormLogin>
          <ParagraphLogin id="username">
            <FormLableLogin htmlFor="username">USERNAME</FormLableLogin>
            <InputLogin name="username" type="text"></InputLogin>
          </ParagraphLogin>
          <ParagraphLogin id="password">
            <FormLableLogin htmlFor="password">PASSWORD</FormLableLogin>
            <InputLogin name="password" type="password"></InputLogin>
          </ParagraphLogin>
          <ParagraphLogin id="buttons">
            <SigninButton id="signIn" onClick={login}>
              Sign In
            </SigninButton>
            <label id="forgot">Forgot Password?</label>
          </ParagraphLogin>
        </FormLogin>
        <footer>
          <FooterButton>Continue with Google</FooterButton>
          <FooterButton>Continue with Discord</FooterButton>
        </footer>
      </MainLogin>
    </div>
  );
}

export default Login;
