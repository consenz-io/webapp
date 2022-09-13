import { Button, Stack, Typography, Chip } from '@mui/material';
import { AgreementContext } from 'contexts/agreement';
import { FC, useContext } from 'react';
import { ReactComponent as DocLogo } from 'assets/icons/document.svg';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { generateColorFromString } from 'utils/functions';
import { Appbar } from 'components';
import { BreadcrumsProps } from 'components/Appbar';
import { GroupContext } from 'contexts/group';

const AgreementPage: FC = () => {
  const { categories } = useContext(GroupContext);
  const agreementContext = useContext(AgreementContext);
  const currentCategory: string = agreementContext.categoryName;
  const categoryColor = currentCategory
    ? generateColorFromString(currentCategory, true)
    : 'primary';
  const breadcrumsProps: BreadcrumsProps[] = [
    {
      name: currentCategory || 'categoryName',
      link:
        categories
          .filter((categoryObj) => categoryObj.name === currentCategory)[0]
          ?.id.toString() || '',
    },
    {
      name: agreementContext.agreementTitle || 'Agreement Name',
      link: agreementContext.agreementId.toString(),
      icon: DocLogo,
    },
  ];
  return (
    <Stack direction="column">
      <Appbar breadcrumsSection={breadcrumsProps}></Appbar>
      <Stack direction="column">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ margin: '2rem' }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography sx={{ fontSize: '36px' }} variant="h1">
              {agreementContext.agreementTitle || 'Agreement Name'}
            </Typography>
            {currentCategory && (
              <Chip
                label={currentCategory ? currentCategory : ''}
                size="small"
                style={{
                  marginLeft: '1rem',
                  backgroundColor: categoryColor,
                  fontSize: '0.8rem',
                }}
              />
            )}
          </Stack>
          <Button variant="contained">
            <VisibilityOutlinedIcon />
            <Typography variant="body1"> View Agreement</Typography>
          </Button>
        </Stack>
        <Typography sx={{ paddingLeft: '3rem', fontSize: '16px' }} variant="body2">
          {agreementContext.rationale || 'rationale'}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default AgreementPage;
