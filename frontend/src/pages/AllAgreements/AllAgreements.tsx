import './AllAgreements.css';
import AddIcon from '@mui/icons-material/Add';
import img from '../../assets/Group_120.png';
import * as SC from './AllAgreements.style';
import { useTranslation } from 'react-i18next';
import { StringBank } from '../../strings';
import { useParams } from 'react-router-dom';
import { FC, useContext } from 'react';
import { DataContext } from '../../contexts/data';
import { Button, Container, Stack } from '@mui/material';

const AllAgreements: FC = () => {
  const { t } = useTranslation();
  const { groupSlug } = useParams();
  const { user } = useContext(DataContext);

  const getGroupNameBySlug = (slug: string) =>
    user?.groups?.find((group) => group.slug === slug)?.name;

  return (
    <Container>
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
        <SC.UserAgreements>
          {t(StringBank.GROUP_AGREEMENTS, { group: getGroupNameBySlug(groupSlug || '') })}
        </SC.UserAgreements>
        <Button variant="contained" startIcon={<AddIcon />}>
          {t(StringBank.NEW_AGREEMENT)}
        </Button>
      </Stack>
      <section>
        <img src={img} alt="" />
        <div className="msg">
          <p>{t(StringBank.CREATE_FIRST_AGREEMENT)}</p>
        </div>
        <div className="btnRow">
          <Button variant="contained" startIcon={<AddIcon />}>
            {t(StringBank.NEW_AGREEMENT)}
          </Button>
        </div>
      </section>
    </Container>
  );
};

export default AllAgreements;
