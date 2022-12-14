import AddIcon from '@mui/icons-material/Add';
import img from '../assets/Group_120.png';
import { useTranslation } from 'react-i18next';
import { StringBank } from '../strings';
import { useNavigate } from 'react-router-dom';
import { FC, useContext } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { AgreementCarousel } from 'components';
import { GroupContext } from 'contexts/group';
import { AuthContext } from 'contexts';

interface IProps {
  isArchive?: boolean;
}

const AllAgreements: FC<IProps> = ({ isArchive = false }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { jwt, loginWithRedirect } = useContext(AuthContext);

  const { activeAgreements, archivedAgreements, name, slug } = useContext(GroupContext);

  const agreements = isArchive ? archivedAgreements : activeAgreements;

  const goToNewAgreement = (e: React.MouseEvent<HTMLElement>, slug = '') => {
    const url = `/${slug}/new-agreement`;
    if (!jwt) {
      return loginWithRedirect(url);
    }
    navigate(url);
  };

  return (
    <Stack
      justifyContent={agreements?.length ? 'start' : 'space-between'}
      height="100%"
      padding={{ sm: 2 }}
      gap={2}
    >
      <Stack flexDirection="row" justifyContent="space-between" paddingX={1}>
        <Typography variant="h2">{t(StringBank.GROUP_AGREEMENTS, { group: name })}</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={(event) => goToNewAgreement(event, slug)}
        >
          {t(StringBank.NEW_AGREEMENT)}
        </Button>
      </Stack>
      {agreements.length ? (
        <AgreementCarousel agreements={agreements} />
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
            onClick={(event) => goToNewAgreement(event, slug)}
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
