import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { StringBank } from '../strings';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { AgreementCarousel } from 'components';
import { GroupContext } from 'contexts/group';

const AllArchievedAgreements = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleMenuItemClick = (e: React.MouseEvent<HTMLElement>, slug = '') => {
    navigate(`/${slug}/new-agreement`);
  };
  const { archivedAgreements, name, slug } = useContext(GroupContext);
  if (!archivedAgreements.length) {
    return (
      <Stack direction="column" height="100%">
        <Stack direction="row" alignItems="center" justifyContent="flex-start">
          <Typography fontSize="1.625rem" fontWeight="600">
            Archive
          </Typography>
        </Stack>
        <Stack direction="column" justifyContent="center" alignItems="center" height="80%">
          <Stack direction="row" width="100%" justifyContent="center" alignItems="center">
            <Typography variant="h3" textAlign="center">
              And this is where i&apos;ll put my <br /> archived agreements
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography fontSize="0.875rem" color="#adb2b8" padding="1rem 0">
              If I had any...
            </Typography>
          </Stack>
        </Stack>
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
      <Stack flexDirection={{ xs: 'column', sm: 'row' }} flexWrap={{ sx: 'nowrap', sm: 'wrap' }}>
        {archivedAgreements.map((archivedAgreement, i) => (
          <AgreementCarousel {...archivedAgreement} key={i} />
        ))}
      </Stack>
      <Stack />
    </Stack>
  );
};

export default AllArchievedAgreements;
