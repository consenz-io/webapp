import {useContext, useEffect} from "react";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Button from "@mui/material/Button";
import * as SC from "./style";
import { ColorModeAndDirectionContext } from "theme/theme";
import { AuthContext } from "contexts";
import { SidebarController } from "components";
import { useOutletContext } from "react-router-dom";
import { IOutletContext } from "types/misc";
import { useResponsive } from "hooks";

const Home = () => {
  const { isMobile } = useResponsive();
  const { sidebar } = useOutletContext<IOutletContext>();
  
  const theme = useTheme();
  const { toggleColorMode, mode, toggleDirection, isRTL } = useContext(ColorModeAndDirectionContext);
  const {jwt, logout} = useContext(AuthContext);

  useEffect(() => {
    document.dir = isRTL ? "rtl" : "ltr";
  }, [isRTL]);

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
      | User Auth state: {jwt ? "logged in" : "logged out"}|
      <button onClick={() => logout()}>
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
