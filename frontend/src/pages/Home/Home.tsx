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
  console.log("process.env", process.env);

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  console.log("isAuthenticated", isAuthenticated);
  const theme = useTheme();
  const { toggleColorMode, mode } = useContext(ColorModeContext);
  getAccessTokenSilently().then((token) => {});
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
    </SC.Main>
  );
};

export default Home;
