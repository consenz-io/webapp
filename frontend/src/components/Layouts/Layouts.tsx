import * as SC from './style';
import { Dialog, Sidebar } from 'components';
import { FC, useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { GroupContext } from 'contexts/group';
import { Stack, Container, LinearProgress } from '@mui/material';
import { Logo } from 'assets';
import { SettingsContext } from '../../contexts/settings';
import { useTranslation } from 'react-i18next';
import { StringBank } from 'strings';

export const SidebarLayout: FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hadSeenBetaVersion, setHadSeenBetaVersion] = useState(
    localStorage.getItem('hadSeenBetaVersion') === 'true'
  );
  const { isLoadingAgreements } = useContext(GroupContext);
  const { isRTL } = useContext(SettingsContext);
  const { t } = useTranslation();

  useEffect(() => {
    localStorage.setItem('hadSeenBetaVersion', String(hadSeenBetaVersion));
  }, [hadSeenBetaVersion]);

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
      <Dialog
        content={t(StringBank.WELCOME_TO_BETA_VERSION)}
        title=""
        openDialogState={!hadSeenBetaVersion}
        finishBtnText={t(StringBank.CONTINUE)}
        finishFunction={() => setHadSeenBetaVersion(true)}
      />
    </>
  );
};
