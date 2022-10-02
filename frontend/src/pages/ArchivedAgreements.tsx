import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { StringBank } from '../strings';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { AgreementCarousel } from 'components';
import { GroupContext } from 'contexts/group';
import { Box } from '@mui/system';

const AllArchievedAgreements = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleMenuItemClick = (e: React.MouseEvent<HTMLElement>, slug = '') => {
    navigate(`/${slug}/new-agreement`);
  };
  const { archivedAgreements, name, slug } = useContext(GroupContext);
  if (!archivedAgreements.length) {
    return (
      <Stack padding={{ sm: 2 }} height="100%" justifyContent="space-between">
        <Typography variant="h2">{t(StringBank.ARCHIVE)}</Typography>
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
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
      justifyContent={archivedAgreements?.length ? 'start' : 'space-between'}
      height="100%"
      padding={{ sm: 2 }}
      spacing={2}
    >
      <Stack flexDirection="row" justifyContent="space-between" paddingX={1}>
        <Typography variant="h2">{t(StringBank.GROUP_AGREEMENTS, { group: name })}</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={(event) => handleMenuItemClick(event, slug)}
        >
          {t(StringBank.NEW_AGREEMENT)}
        </Button>
      </Stack>
      <AgreementCarousel agreements={archivedAgreements} />
      <Stack />
    </Stack>
  );
};

export default AllArchievedAgreements;
