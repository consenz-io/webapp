import { Breadcrumbs, Button, Link, Stack, Typography, Chip } from '@mui/material';
import { GroupContext } from 'contexts/group';
import React, { FC, useContext } from 'react';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useParams } from 'react-router-dom';

const AgreementPage: FC = () => {
  const { activeAgreements } = useContext(GroupContext);
  const { agreementId } = useParams();
  const currentAgreement = activeAgreements.filter(
    (agreement) => agreement.id.toString() === agreementId
  )[0];
  const currentCategory = currentAgreement.category.name;
  const handleClick = (e: any) => {
    e.preventDefault();
    console.log('clicked breadcrumb');
  };
  return (
    <Stack direction="column">
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
          {currentCategory || 'categoryName'}
        </Link>
        <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
          <Stack direction="row" gap="5px">
            <SummarizeOutlinedIcon />
            {localStorage.getItem('agreementName') || 'Agreement Name'}
          </Stack>
        </Link>
      </Breadcrumbs>
      <Stack direction="column">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ margin: '2rem' }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h1">
              {localStorage.getItem('agreementName') || 'Agreement Name'}
            </Typography>
            <Chip
              label={currentCategory}
              size="small"
              sx={{ marginLeft: '1rem', backgroundColor: '#4c67f6', fontSize: '0.8rem' }}
            />
          </Stack>
          <Button variant="contained">
            <VisibilityOutlinedIcon />
            <Typography variant="body1"> View Agreement</Typography>
          </Button>
        </Stack>
        <Typography sx={{ paddingLeft: '3rem' }} variant="body2">
          {localStorage.getItem('rationale') || 'rationale'}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default AgreementPage;
