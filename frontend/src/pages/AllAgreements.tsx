import AddIcon from '@mui/icons-material/Add';
import img from '../assets/Group_120.png';
import { useTranslation } from 'react-i18next';
import { StringBank } from '../strings';
import { useNavigate, useParams } from 'react-router-dom';
import { FC, useContext } from 'react';
import { DataContext } from '../contexts/data';
import { Box, Button, Stack, Typography } from '@mui/material';
import { AgreementCard } from 'components';

const AllAgreements: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { groupSlug } = useParams();
  const { user } = useContext(DataContext);

  const currentGroup = user?.groups?.find((group) => group.slug === groupSlug);

  const handleMenuItemClick = (e: React.MouseEvent<HTMLElement>, slug = '') => {
    navigate(`/${slug}/new-agreement`);
  };

  return (
    <Stack
      justifyContent={currentGroup?.agreements?.length ? 'start' : 'space-between'}
      height="100%"
      padding={{ sm: 2 }}
      spacing={2}
    >
      <Stack flexDirection="row" justifyContent="space-between" paddingX={1}>
        <Typography variant="h2">
          {t(StringBank.GROUP_AGREEMENTS, { group: currentGroup?.name })}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={(event) => handleMenuItemClick(event, groupSlug)}
        >
          {t(StringBank.NEW_AGREEMENT)}
        </Button>
      </Stack>
      {currentGroup?.agreements?.length ? (
        <Stack flexDirection={{ xs: 'column', sm: 'row' }} flexWrap={{ sx: 'nowrap', sm: 'wrap' }}>
          {currentGroup?.agreements?.map((agreement, i) => (
            <Box key={i} flexBasis={{ xs: '25%', sm: '33%', lg: '25%', xl: '20%' }} padding={1}>
              <AgreementCard
                participants={14}
                category={agreement.category?.name}
                title={agreement.name}
                updatedAt={new Date(agreement.updated_at)}
              />
            </Box>
          ))}
        </Stack>
      ) : (
        <Stack alignItems="center" justifyContent="center">
          <Stack flexDirection="row" justifyContent="center">
            <img src={img} alt="" />
          </Stack>
          <Typography variant="h1" paddingY={5}>
            {t(StringBank.CREATE_FIRST_AGREEMENT)}
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={(event) => handleMenuItemClick(event, groupSlug)}
          >
            {t(StringBank.NEW_AGREEMENT)}
          </Button>
        </Stack>
      )}
      <Stack />
    </Stack>
  );
};

export default AllAgreements;
