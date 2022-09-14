import { Button, Container, Divider, IconButton, Stack, SvgIcon, Typography } from '@mui/material';
import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { StringBank } from 'strings';
import { useNavigate } from 'react-router-dom';
import { GroupContext } from 'contexts/group';
import handLogo from 'assets/icons/hand-v@3x.png';
import styled from 'styled-components';
import { ReactComponent as CopyIcon } from 'assets/icons/copy.svg';

const CopyIconWrapper = styled(SvgIcon)`
  svg path {
    fill: #adb2b8;
  }
`;

const CopyEL: FC<{ text: string }> = ({ text }) => {
  return (
    <IconButton
      sx={{ marginStart: '2rem', marginEnd: '1rem' }}
      onClick={() => {
        navigator.clipboard.writeText(text);
      }}
    >
      <CopyIconWrapper>
        <CopyIcon />
      </CopyIconWrapper>
    </IconButton>
  );
};

const AgreementCreatedSuccessfully: FC<{ agreementId: string }> = ({ agreementId }) => {
  const { t } = useTranslation();
  const { slug: groupSlug } = useContext(GroupContext);
  const navigate = useNavigate();
  const AgreementText = `${window.location.origin}/${groupSlug}/agreement/${agreementId}`;
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
        <Button variant="contained" size="large" color="primary" fullWidth>
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
          spacing={2}
          alignItems="center"
          justifyContent="center"
          bgcolor="rgba(0,0,0,0.08)"
          borderRadius="4px"
          border="solid 1px #565d68"
          padding="0 1rem"
        >
          <Typography
            variant="body2"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
            width="13rem"
            color="text.secondary"
          >
            {AgreementText}
          </Typography>
          <CopyEL text={AgreementText} />
        </Stack>
      </Stack>
    </Container>
  );
};

export default AgreementCreatedSuccessfully;
