import {useContext, useEffect} from "react";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Button from "@mui/material/Button";
import * as SC from "./style";
import { ColorModeAndDirectionContext } from "theme/theme";
import { AuthContext } from "services";
import { SidebarController } from "components";
import { useOutletContext } from "react-router-dom";
import { IOutletContext } from "types";
import { useResponsive } from "hooks";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { isMobile } = useResponsive();
  const { sidebar } = useOutletContext<IOutletContext>();
  const { isAuthenticated, getAccessTokenSilently, logout, loginWithRedirect } =
    useAuth0();
  const theme = useTheme();
  const { toggleColorMode, mode, toggleDirection, isRTL } = useContext(ColorModeAndDirectionContext);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    document.dir = isRTL ? "rtl" : "ltr";
  }, [isRTL]);

  getAccessTokenSilently()
    .then((token) => authContext?.setJwt(token))
    .catch(() => loginWithRedirect());

  return (
    <SC.Main>
      Home page
      {isRTL && <span>RTL</span>}
      <button onClick={toggleDirection}>
        Toggle RTL
      </button>
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
      <a href="/buttons">BTNS</a>
    </SC.Main>
  );
};

export default Home;
