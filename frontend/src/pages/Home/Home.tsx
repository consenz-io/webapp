import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Button from "@mui/material/Button";
import * as SC from "./style";
import { ColorModeContext } from "theme/theme";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const theme = useTheme();
  const { toggleColorMode, mode } = useContext(ColorModeContext);
  console.log(`user: `, user, " is auth: ", isAuthenticated);

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
      <Button variant="contained">Contained</Button>
    </SC.Main>
  );
};

export default Home;
