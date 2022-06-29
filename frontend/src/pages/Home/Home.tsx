import { useContext, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Button from "@mui/material/Button";
import * as SC from "./style";
import { ColorModeContext } from "theme/theme";
import { AuthContext } from "services";
import { SidebarController } from "components";
import { useOutletContext } from "react-router-dom";
import { IOutletContext } from "types";
import { useResponsive } from "hooks";
import { useAuth0 } from "@auth0/auth0-react";
import {
  ApolloClient,
  gql,
  // useQuery,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
const userQuery = gql`
  query Q1 {
    core_users {
      email
      id
      user_groups {
        group {
          name
        }
      }
    }
  }
`;
const createApolloClient = (authToken: string) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "postgres://postgres:postgrespassword@postgres:5432/postgres",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }),
    cache: new InMemoryCache(),
  });
};
const Home = () => {
  const { isMobile } = useResponsive();
  const { sidebar } = useOutletContext<IOutletContext>();
  const { isAuthenticated, getAccessTokenSilently, logout, loginWithRedirect } =
    useAuth0();
  const theme = useTheme();
  const { toggleColorMode, mode } = useContext(ColorModeContext);
  const authContext = useContext(AuthContext);
  function showJWT() {
    const token = authContext?.jwt;
    console.log("token in home comp", token);
  }
  useEffect(() => {
    async function fetchToken() {
      try {
        const token = await getAccessTokenSilently();
        authContext?.setJwt(token);
        console.log("authContext!.jwt", authContext?.jwt);
        const client = createApolloClient(authContext!.jwt);
        console.log("client", client);
      } catch (error) {
        loginWithRedirect();
      }
    }
    fetchToken();
  }, [authContext?.jwt]);

  return (
    <SC.Main>
      Home page
      <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
        Toggle theme -{" "}
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
      <span>Theme is: {mode}</span>
      <Button variant="contained">Contained</Button> |<a href="/login">login</a>{" "}
      | User Auth state: {isAuthenticated.toString()}|
      <button
        onClick={() => {
          logout({ returnTo: window.location.origin });
        }}
      >
        log out
      </button>
      <Button variant="contained">Contained</Button>
      {isMobile && (
        <SidebarController handleSidebarToggle={sidebar.handleSidebarToggle} />
      )}
      <a href="/welcome">welcome</a>
      <button onClick={showJWT}>Get JWT</button>
    </SC.Main>
  );
};

export default Home;
