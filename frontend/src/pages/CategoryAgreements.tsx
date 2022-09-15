import { useQuery } from '@apollo/client';
import { Stack, Typography, Button } from '@mui/material';
import { DataContext } from 'contexts';
import { useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { StringBank } from 'strings';
import { IAgreement } from 'types';
import { agreementsQuery } from 'utils/queries';
import AddIcon from '@mui/icons-material/Add';
import { AgreementCarousel } from 'components';
import { useTranslation } from 'react-i18next';
import { GroupContext } from 'contexts/group';
import styled from 'styled-components';

interface State {
  catName: string;
  catColor: string;
}

const Span = styled.span`
  && {
    background-color: ${(props) => props.color};
    width: 54px;
    height: 25px;
    flex-grow: 0;
    padding: 2px 6px 3px;
    border-radius: 4px;
    font-size: 14px;
    margin: 0 6px;
    font-weight: normal;
    letter-spacing: normal;
  }
`;

const NewAgreementButton = styled(Button)`
  && {
    width: 160px;
    height: 36px;
    border-radius: 8px;
    flex-grow: 0;
    font-family: Lato;
    font-size: 14px;
    background-color: #3f4550;
  }
`;

const AllCategories = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const state: State = useLocation().state as State;
  const { catName, catColor } = state;
  const { categoryId } = useParams();
  const { user } = useContext(DataContext);
  const { slug } = useContext(GroupContext);
  const currentGroup = user?.groups?.find((group) => group.slug === slug);
  const vars = {
    groupId: currentGroup?.id || -1,
    isArchived: false,
    categoryId,
  };
  const { data: categoryAgreements } = useQuery<{
    core_agreements: IAgreement[];
  }>(agreementsQuery(categoryId), {
    variables: vars,
  });
  const handleMenuItemClick = (e: React.MouseEvent<HTMLElement>, slug = '') => {
    navigate(`/${slug}/new-agreement`);
  };

  const agreements = categoryAgreements;
  const categoryName = agreements?.core_agreements[0]?.category?.name || 'category';
  if (!agreements || !agreements?.core_agreements.length) {
    return (
      <Stack direction="column" height="100%">
        <Stack direction="row" alignItems="center" justifyContent="flex-start">
          <Typography variant="h2">{catName}</Typography>
        </Stack>
        <Stack justifyContent="center" alignItems="center" height="80%">
          <Stack direction="row" width="100%" justifyContent="center" alignItems="center">
            <Typography variant="h3">
              There are no <Span color={catColor}>{catName}</Span> agreements
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography variant="body2" color="#adb2b8" padding="1rem 0">
              {t(StringBank.CATEGORY_EMPTY_MESSAGE)}
            </Typography>
          </Stack>
          <Stack direction="row" padding="1rem 0">
            <NewAgreementButton variant="contained" startIcon={<AddIcon />}>
              {t(StringBank.NEW_AGREEMENT)}
            </NewAgreementButton>
          </Stack>
        </Stack>
      </Stack>
    );
  }
  return (
    <Stack justifyContent="start" height="100%" padding={{ sm: 2 }} spacing={2}>
      <Stack flexDirection="row" justifyContent="space-between" paddingX={1}>
        <Typography variant="h2">
          {t(StringBank.CATEGORY_AGREMENTS, {
            category: categoryName.toUpperCase(),
          })}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={(event) => handleMenuItemClick(event, slug)}
        >
          {t(StringBank.NEW_AGREEMENT)}
        </Button>
      </Stack>
      <Stack flexDirection={{ xs: 'column', sm: 'row' }} flexWrap={{ sx: 'nowrap', sm: 'wrap' }}>
        {agreements?.core_agreements.map((agreement, i) => (
          <AgreementCarousel {...agreement} key={i} />
        ))}
      </Stack>
      <Stack />
    </Stack>
  );
};

export default AllCategories;
