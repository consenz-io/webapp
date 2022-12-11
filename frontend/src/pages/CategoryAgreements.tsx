import { Stack, Typography, Button, Box } from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StringBank } from 'strings';
import AddIcon from '@mui/icons-material/Add';
import { AgreementCarousel } from 'components';
import { useTranslation } from 'react-i18next';
import { GroupContext } from 'contexts/group';
import styled from 'styled-components';
import { generateColorFromString } from 'utils/functions';
import { AuthContext } from 'contexts';
import { useAuth0 } from '@auth0/auth0-react';

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

const CategoryAgreements = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { slug, currentCategory, activeAgreements: agreements } = useContext(GroupContext);
  const category = currentCategory || { id: 0, name: t(StringBank.UNCATEGORIZED) };
  const { jwt } = useContext(AuthContext);
  const { logout } = useAuth0();
  const handleMenuItemClick = (e: React.MouseEvent<HTMLElement>, slug = '') => {
    if (jwt) {
      navigate(`/${slug}/new-agreement`);
    } else {
      logout();
    }
  };

  if (!agreements?.length) {
    return (
      <Stack height="100%" justifyContent="space-between" padding={{ sm: 2 }}>
        <Typography variant="h2">{category?.name}</Typography>
        <Stack justifyContent="center" alignItems="center">
          <Typography variant="h3">
            There are no{' '}
            <Span color={generateColorFromString(category?.name || '', true)}>
              {category?.name}
            </Span>{' '}
            agreements
          </Typography>
          <Stack direction="row">
            <Typography variant="body2" color="#adb2b8" padding="1rem 0">
              {t(StringBank.CATEGORY_EMPTY_MESSAGE)}
            </Typography>
          </Stack>
          <Stack direction="row" padding="1rem 0">
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={(event) => handleMenuItemClick(event, slug)}
            >
              {t(StringBank.NEW_AGREEMENT)}
            </Button>
          </Stack>
        </Stack>
        <Box></Box>
      </Stack>
    );
  }
  return (
    <Stack justifyContent="start" height="100%" padding={{ sm: 2 }} spacing={2}>
      <Stack flexDirection="row" justifyContent="space-between" paddingX={1}>
        <Typography variant="h2">
          {t(StringBank.CATEGORY_AGREEMENTS, {
            category: category.name.toUpperCase(),
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
      <AgreementCarousel agreements={agreements} />
      <Stack />
    </Stack>
  );
};

export default CategoryAgreements;
