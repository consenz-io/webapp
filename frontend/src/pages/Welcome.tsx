import { Stack, Typography } from "@mui/material";
import { Page } from "components/Page";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { StringBank } from "strings";

export const Welcome: FC = () => {
  const {t} = useTranslation();
  return (
    <Page>
      <Stack alignItems="center" justifyContent="center" flexGrow={1}>
        <Typography variant="h1" gutterBottom>{t(StringBank.WELCOME_HEADER)}</Typography>
        <Typography paragraph textAlign="center" marginY={1}>{t(StringBank.WELCOME_PARAGRAPH)}</Typography>
      </Stack>
    </Page>
  );
};
