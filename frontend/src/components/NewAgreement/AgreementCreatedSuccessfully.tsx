import { Box, Button, Container, Divider, Stack, Typography } from '@mui/material';
import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import { StringBank } from 'strings';
import { useNavigate } from 'react-router-dom';
import { GroupContext } from 'contexts/group';

const AgreementCreatedSuccessfully: FC = () => {
  const { t } = useTranslation();
  const { slug: groupSlug } = useContext(GroupContext);
  const navigate = useNavigate();
  return (
    <Container maxWidth="xs" sx={{ height: '100%' }}>
      <Stack alignItems="center" justifyContent="center" paddingX={6} spacing={2} height="100%">
        <DoneRoundedIcon
          fontSize="large"
          sx={{ bgcolor: 'success.main', borderRadius: '50%', padding: 0.5 }}
        />
        <Typography variant="h2" textAlign="center">
          {t(StringBank.AGREEMENT_PUBLISHED_SUCCESSFULLY)}
        </Typography>
        <Box />
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
        <Divider flexItem sx={{ paddingY: 1 }} />
        <Typography>{t(StringBank.SHARE_AGREEMENT)}</Typography>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
          <Typography>stub for now</Typography>
        </Stack>
      </Stack>
    </Container>
  );
};

export default AgreementCreatedSuccessfully;
