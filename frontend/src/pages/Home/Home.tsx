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
import { useNavigate, useOutletContext } from "react-router-dom";
import { IOutletContext } from "types";
import { useResponsive } from "hooks";
import { useAuth0 } from "@auth0/auth0-react";
import {DataContext} from "store";

const Home = () => {
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
  const { sidebar } = useOutletContext<IOutletContext>();
  const { isAuthenticated, getAccessTokenSilently, logout, loginWithRedirect } = useAuth0();
  const theme = useTheme();
  const { toggleColorMode, mode } = useContext(ColorModeContext);
  const authContext = useContext(AuthContext);
  const {globalUser} = useContext(DataContext);
  const {groups} = globalUser;

  useEffect(() => {
    if (groups.length > 0) {
      navigate(`/${groups[0].slug}/all-agreements`);
    }
  }, [groups]);

  getAccessTokenSilently()
    .then((token) => authContext?.setJwt(token))
    .catch(() => loginWithRedirect());

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
          logout({returnTo: window.location.origin});
        }}
      >
        log out
      </button>
      <Button variant="contained">Contained</Button>
      {isMobile &&
          <SidebarController handleSidebarToggle={sidebar.handleSidebarToggle} />
      }
    </SC.Main>
  );
};

export default Home;
