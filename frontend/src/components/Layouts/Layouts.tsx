import * as SC from './style';
import { Sidebar } from 'components';
import { FC, useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { GroupContext } from 'contexts/group';
import { Stack, Container, LinearProgress } from '@mui/material';
import { Logo } from 'assets';

export const SidebarLayout: FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoading } = useContext(GroupContext);

  const handleSidebarToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <Sidebar mobileOpen={mobileOpen} handleSidebarToggle={handleSidebarToggle} />
      <SC.Wrapper>
        {isLoading ? (
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
            <LinearProgress />
          </Container>
        ) : (
          <Outlet context={{ sidebar: { mobileOpen, handleSidebarToggle } }} />
        )}
      </SC.Wrapper>
    </>
  );
};
