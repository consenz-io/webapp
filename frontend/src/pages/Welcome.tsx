import { useAuth0 } from '@auth0/auth0-react';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { Box, Stack, Typography } from '@mui/material';
import { DropDownMenu } from 'components';
import { AuthContext } from 'contexts';
import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { StringBank } from 'strings';
import pointImg from '../assets/Hands_Point.svg';

export const Welcome: FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth0();
  const { logout, loginWithRedirect } = useContext(AuthContext);

  return (
    <Stack sx={{ backgroundColor: '#5320c9', height: '100vh' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" padding={4}>
        <a href="/">
          <img src="/logo.svg" alt="logo" />
        </a>
        <DropDownMenu
          isBorderHidden
          name="user"
          menuItems={[
            {
              text: user ? t(StringBank.LOGOUT) : t(StringBank.LOGIN),
              action: user ? logout : loginWithRedirect,
            },
          ]}
          buttonText={user?.given_name || user?.nickname || t(StringBank.ANONYMOUS)}
          btnCapital={user?.nickname?.charAt(0)}
          endIcon={<KeyboardArrowDown />}
          hoverColor="transparent"
        />
      </Stack>
      <Stack alignItems="center" justifyContent="flex-end" flexGrow={1}>
        <Typography variant="h1" gutterBottom>
          {t(StringBank.WELCOME_HEADER)}
        </Typography>
        <Typography paragraph textAlign="center" marginY={1}>
          {t(StringBank.WELCOME_PARAGRAPH)}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="flex-end">
        <Box paddingBottom={4}>
          <img src={pointImg} alt="point image" />
        </Box>
      </Stack>
    </Stack>
  );
};
