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

const Home = () => {
  const { isMobile } = useResponsive();
  const { sidebar } = useOutletContext<IOutletContext>();
  const theme = useTheme();
  const { toggleColorMode, mode } = useContext(ColorModeContext);
  const authContext = useContext(AuthContext);

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
      <button onClick={() => authContext?.setJwt("new_jwt")}>
        click set jwt
      </button>
      <Button variant="contained">Contained</Button>
      {isMobile &&
          <SidebarController handleSidebarToggle={sidebar.handleSidebarToggle} />
      }
    </SC.Main>
  );
};

export default Home;
