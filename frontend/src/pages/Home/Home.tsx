import { useContext } from "react";
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
import { userQuery } from "../../services/queries";
import { useQuery } from "@apollo/client";
import { UserQueryObject } from "services/types";
import { Navigate } from "react-router-dom";
const Home = () => {
  const { isMobile } = useResponsive();
  const { sidebar } = useOutletContext<IOutletContext>();
  const { isAuthenticated, logout } = useAuth0();
  const theme = useTheme();
  const { toggleColorMode, mode } = useContext(ColorModeContext);
  const authContext = useContext(AuthContext);
  function showJWT() {
    const token = authContext?.jwt;
    console.log("token in home comp", token);
  }
  const { loading, error, data } = useQuery(userQuery);

  if (loading) {
    console.log("loading...");
  }
  if (error) {
    console.log("error", error);
  }
  if (data) {
    console.log("data", data);
    if (data.core_users.length > 0) {
      for (let i = 0; i < data.core_users.length; i++) {
        const userObj: UserQueryObject = data.core_users[i];
        if (userObj.user_groups.length < 1) {
          return (
            <Navigate
              to={{
                pathname: "/welcome",
              }}
            />
          );
        }
      }
    }
  }

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
