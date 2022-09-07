import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
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
      sx={{ marginLeft: '2rem', marginRight: '1rem' }}
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

const CopyAgreementContainer = styled(Stack)`
  && {
    width: 298px;
    height: 42px;
    flex-grow: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 24px 16px;
    border-radius: 4px;
    border: solid 1px #565d68;
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

const AgreementTextSpan = styled.span`
  && {
    width: 209px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.71;
    letter-spacing: normal;
    text-align: left;
    color: #adb2b8;
  }
`;

const AgreementCreatedSuccessfully: FC<{ agreementId: string }> = ({ agreementId }) => {
  const { t } = useTranslation();
  const { slug: groupSlug } = useContext(GroupContext);
  const navigate = useNavigate();
  const AgreementText = `${window.location.origin}/${groupSlug}/agreement/${agreementId}`;
  return (
    <Container maxWidth="xs" sx={{ height: '100%' }}>
      <Stack alignItems="center" justifyContent="center" paddingX={6} spacing={2} height="100%">
        <img width="165px" height="180px" src={handLogo}></img>
        <Typography variant="h2" textAlign="center">
          {t(StringBank.AGREEMENT_PUBLISHED_SUCCESSFULLY)}
        </Typography>
        <Box />
        <Button variant="contained" size="large" sx={{ backgroundColor: '#8d54ea' }} fullWidth>
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
        <Divider flexItem sx={{ paddingY: '0 2rem', margin: '0' }} />
        <Typography>{t(StringBank.SHARE_AGREEMENT)}</Typography>
        <CopyAgreementContainer
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <AgreementTextSpan>{AgreementText}</AgreementTextSpan>
          <CopyEL text={AgreementText} />
        </CopyAgreementContainer>
      </Stack>
    </Container>
  );
};

export default AgreementCreatedSuccessfully;
