import { useAuth0 } from '@auth0/auth0-react';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { Stack, Typography } from '@mui/material';
import { DropDownMenu } from 'components';
import { AuthContext } from 'contexts';
import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { StringBank } from 'strings';

export const Welcome: FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth0();
  const { logout } = useContext(AuthContext);

  return (
    <Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" padding={4}>
        <a href="/">
          <img src="/logo.svg" alt="logo" />
        </a>
        <DropDownMenu
          isBorderHidden
          name="user"
          menuItems={[{ text: t(StringBank.LOGOUT), action: logout }]}
          buttonText={user?.given_name || user?.nickname || ''}
          btnCapital={user?.nickname?.charAt(0)}
          endIcon={<KeyboardArrowDown />}
        />
      </Stack>
      <Stack padding={5} />
      <Stack alignItems="center" justifyContent="center" flexGrow={1}>
        <Typography variant="h1" gutterBottom>
          {t(StringBank.WELCOME_HEADER)}
        </Typography>
        <Typography paragraph textAlign="center" marginY={1}>
          {t(StringBank.WELCOME_PARAGRAPH)}
        </Typography>
      </Stack>
    </Stack>
  );
};
