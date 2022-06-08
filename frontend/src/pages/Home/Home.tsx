import { useContext, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Button from "@mui/material/Button";
import * as SC from "./style";
import { ColorModeContext } from "theme/theme";
import { AuthContext } from "services";

const Home = () => {
  const theme = useTheme();
  const { toggleColorMode, mode } = useContext(ColorModeContext);
  const { getJwt, storeJwt } = useContext(AuthContext);
  const setJwtState = (jwt: string) => {
    console.log("before", jwt);
    storeJwt(jwt);
    console.log("after", jwt);
  };
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
      <button onClick={() => setJwtState("new_jwt")}>click set jwt</button>
      <Button variant="contained">Contained</Button>
    </SC.Main>
  );
};

export default Home;
