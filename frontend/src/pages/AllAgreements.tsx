import AddIcon from '@mui/icons-material/Add';
import img from '../assets/Group_120.png';
import { useTranslation } from 'react-i18next';
import { StringBank } from '../strings';
import { useNavigate, useParams } from 'react-router-dom';
import { FC, useContext } from 'react';
import { DataContext } from '../contexts/data';
import { Button, Stack, Typography } from '@mui/material';
import { AgreementCard } from 'components';

const AllAgreements: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { groupSlug } = useParams();
  const { user } = useContext(DataContext);

  const getGroupBySlug = (slug?: string) => user?.groups?.find((group) => group.slug === slug);

  const handleMenuItemClick = (e: React.MouseEvent<HTMLElement>, slug = '') => {
    navigate(`/${slug}/new-agreement`);
  };

  return (
    <Stack justifyContent="space-between" height="100%" padding={2}>
      <Stack flexDirection="row" justifyContent="space-between">
        <Typography variant="h2">
          {t(StringBank.GROUP_AGREEMENTS, { group: getGroupBySlug(groupSlug)?.name })}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={(event) => handleMenuItemClick(event, groupSlug)}
        >
          {t(StringBank.NEW_AGREEMENT)}
        </Button>
      </Stack>
      {getGroupBySlug(groupSlug)?.agreements?.length ? (
        <Stack flexDirection="row" flexWrap="wrap">
          {getGroupBySlug(groupSlug)?.agreements?.map((agreement, i) => (
            <AgreementCard
              key={i}
              participants={14}
              category={agreement.category?.name}
              title={agreement.name}
              updatedAt={new Date(agreement.updated_at)}
            />
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
