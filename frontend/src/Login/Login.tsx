import "./Login.css";
import auth from "../auth/auth";

function login(e: any) {
  e.preventDefault();
  auth.alternate();
  console.log("current auth state:", auth.getAuth());
}

function Login() {
  return (
    <div id="container">
      <main>
        <header>
          <h1>sign in to start agreeing!</h1>
        </header>
        <form action="">
          <p id="username">
            <label htmlFor="username">USERNAME</label>
            <input name="username" type="text" />
          </p>
          <p id="password">
            <label htmlFor="password">PASSWORD</label>
            <input name="password" type="text" />
          </p>
          <p id="buttons">
            <button id="signIn" onClick={login}>
              Sign In
            </button>
            <label id="forgot">Forgot Password?</label>
          </p>
        </form>
        <footer>
          <button id="googleSignin">Continue with Google</button>
          <button id="discordSignin">Continue with Discord</button>
        </footer>
      </main>
    </div>
  );
}

export default Login;
