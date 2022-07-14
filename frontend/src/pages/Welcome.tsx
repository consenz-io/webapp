import { useAuth0 } from "@auth0/auth0-react";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import {  Stack, Typography } from "@mui/material";
import { DropDownMenu } from "components";
import { Page } from "components/Page";
import { AuthContext } from "contexts";
import { FC, useContext } from "react";
import { useTranslation } from "react-i18next";
import { StringBank } from "strings";

export const Welcome: FC = () => {
  const {t} = useTranslation();
  const {user} = useAuth0();
  const {logout} = useContext(AuthContext);

  return (
    <Page>
      <Stack flexGrow={1}>
        <Stack direction="row" justifyContent="space-between" padding={4}>
          <a href="/">
            <img src="/logo.svg" alt="logo" />
          </a>
          <DropDownMenu
            isBorderHidden
            name='user'
            menuItems={[{text: t(StringBank.LOGOUT), color: "#ed4fae", action: logout}]}
            buttonText={user?.given_name || user?.nickname || ""}
            btnCapital={user?.nickname?.charAt(0)}
            endIcon={<KeyboardArrowDown/>} />
        </Stack>
        <Stack alignItems="center" justifyContent="center" flexGrow={1}>
          <Typography variant="h1" gutterBottom>{t(StringBank.WELCOME_HEADER)}</Typography>
          <Typography paragraph textAlign="center" marginY={1}>{t(StringBank.WELCOME_PARAGRAPH)}</Typography>
        </Stack>
      </Stack>
    </Page>
  );
};
