import * as SC from './style';
import { Sidebar } from 'components';
import { FC, useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { GroupContext } from 'contexts/group';
import { Stack, Container, LinearProgress } from '@mui/material';
import { Logo } from 'assets';
import { SettingsContext } from '../../contexts/settings';

export const SidebarLayout: FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoadingAgreements } = useContext(GroupContext);
  const { isRTL } = useContext(SettingsContext);

  const handleSidebarToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <Sidebar mobileOpen={mobileOpen} handleSidebarToggle={handleSidebarToggle} />
      <SC.Wrapper>
        {isLoadingAgreements ? (
          <Container
            maxWidth="xs"
            sx={{
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            <Stack alignItems="center">
              <Logo />
            </Stack>
            <LinearProgress variant={isRTL ? 'query' : 'indeterminate'} />
          </Container>
        ) : (
          <Outlet context={{ sidebar: { mobileOpen, handleSidebarToggle } }} />
        )}
      </SC.Wrapper>
    </>
  );
};
