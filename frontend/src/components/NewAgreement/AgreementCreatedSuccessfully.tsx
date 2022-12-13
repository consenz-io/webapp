import { Button, Container, Divider, IconButton, Stack, Typography, Snackbar } from '@mui/material';
import { FC, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StringBank } from 'strings';
import { useNavigate } from 'react-router-dom';
import { GroupContext } from 'contexts/group';
import handLogo from 'assets/icons/hand-v@3x.png';
import { ReactComponent as CopyIcon } from 'assets/icons/copy.svg';
import { SvgIcon } from 'components';
import { textSecondaryColor } from 'theme';

const AgreementCreatedSuccessfully: FC<{ agreementId: number }> = ({ agreementId }) => {
  const { t } = useTranslation();
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const { slug: groupSlug } = useContext(GroupContext);
  const navigate = useNavigate();
  const agreementUrl = `${window.location.origin}/${groupSlug}/agreement/${agreementId}`;
  return (
    <Container maxWidth="xs" sx={{ height: '100%' }}>
      <Stack
        alignItems="center"
        justifyContent="center"
        paddingX={6}
        spacing="1.5rem"
        height="100%"
      >
        <img width="165px" height="180px" src={handLogo}></img>
        <Typography variant="h2" textAlign="center">
          {t(StringBank.AGREEMENT_PUBLISHED_SUCCESSFULLY)}
        </Typography>
        <Button
          variant="contained"
          size="large"
          color="primary"
          fullWidth
          onClick={() => (window.location.href = agreementUrl)}
        >
          {t(StringBank.VIEW_AGREEMENT)}
        </Button>
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={() => navigate(`/${groupSlug}/active-agreements`)}
        >
          {t(StringBank.RETURN_TO_ALL_AGREEMENTS)}
        </Button>
        <Divider flexItem />
        <Typography>{t(StringBank.SHARE_AGREEMENT)}</Typography>
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          justifyContent="center"
          bgcolor="rgba(0,0,0,0.08)"
          borderRadius="4px"
          border="solid 1px #565d68"
          paddingX={2}
        >
          <Typography
            variant="body2"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
            width="13rem"
            color="text.secondary"
          >
            {agreementUrl}
          </Typography>
          <IconButton
            sx={{ paddingX: 0 }}
            disableRipple
            onClick={() => {
              setSnackbarOpen(true);
              navigator.clipboard.writeText(agreementUrl);
            }}
          >
            <SvgIcon htmlColor={textSecondaryColor}>
              <CopyIcon />
            </SvgIcon>
          </IconButton>
          <Snackbar
            open={isSnackbarOpen}
            message={t(StringBank.URL_COPIED_SUCCESSFULLY)}
            onClose={() => setSnackbarOpen(false)}
          />
        </Stack>
      </Stack>
    </Container>
  );
};

export default AgreementCreatedSuccessfully;
