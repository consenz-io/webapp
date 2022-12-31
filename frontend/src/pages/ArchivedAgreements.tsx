import { useTranslation } from 'react-i18next';
import { StringBank } from '../strings';
import { useContext } from 'react';
import { Stack, Typography } from '@mui/material';
import { AgreementCarousel } from 'components';
import { GroupContext } from 'contexts/group';
import { Box } from '@mui/system';

const AllArchievedAgreements = () => {
  const { t } = useTranslation();

  const { agreements, isLoading } = useContext(GroupContext);

  if (isLoading === undefined || isLoading) {
    return null;
  }

  if (!agreements.length) {
    return (
      <Stack padding={{ sm: 2 }} height="100%" justifyContent="space-between">
        <Typography variant="h2">{t(StringBank.ARCHIVE)}</Typography>
        <Stack justifyContent="center" alignItems="center" gap={2}>
          <Typography variant="h3" textAlign="center">
            {t(StringBank.ARCHIVE_EMPTY_MESSAGE)}
          </Typography>
          <Typography variant="body2" color="#adb2b8">
            {t(StringBank.ARCHIVE_EMPTY_MESSAGE_END)}
          </Typography>
        </Stack>
        <Box />
      </Stack>
    );
  }
  return (
    <Stack
      justifyContent={agreements?.length ? 'start' : 'space-between'}
      height="100%"
      padding={{ sm: 2 }}
      gap={2}
    >
      <Stack flexDirection="row" justifyContent="space-between" paddingX={1}>
        <Typography variant="h2">{t(StringBank.ARCHIVE)}</Typography>
      </Stack>
      <AgreementCarousel agreements={agreements} />
      <Stack />
    </Stack>
  );
};

export default AllArchievedAgreements;
