import { Breadcrumbs, Button, Link, Stack, Typography, Chip } from '@mui/material';
import { GroupContext } from 'contexts/group';
import { FC, useContext } from 'react';
import DocLogo from 'assets/icons/document.svg';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useParams } from 'react-router-dom';
import { generateColorFromString } from 'utils/functions';
import { SectionCard } from 'components/SectionCard';
import { SectionProps, Suggestion } from 'components/SectionCard/types';

const AgreementPage: FC = () => {
  const { activeAgreements } = useContext(GroupContext);
  const { agreementId } = useParams();
  const currentAgreement = activeAgreements.filter(
    (agreement) => agreement.id.toString() === agreementId
  )[0];
  const currentCategory: string = currentAgreement?.category?.name;
  const categoryColor = currentCategory
    ? generateColorFromString(currentCategory, true)
    : 'primary';

  const handleClick = (e: any) => {
    e.preventDefault();
    console.log('clicked breadcrumb');
  };

  // mock suggestions
  const suggestions1: Suggestion[] = [
    {
      content:
        'sec1 sug1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porta diam cum quisque mi gravida egestas. Feugiat rhoncus, ullamcorper eget massa mi nunc. Auctor sed consequat malesuada cras diam elit. Elementum pellentesque euismod proin dolor. Nibh mi urna eget vitae lorem.',
      comments: ['comment1 sug1', 'comment2 sug1'],
      dislikes: 12,
      likes: 54,
    },
    {
      content:
        'sec1 sug2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porta diam cum quisque mi gravida egestas. Feugiat rhoncus, ullamcorper eget massa mi nunc. Auctor sed consequat malesuada cras diam elit. Elementum pellentesque euismod proin dolor. Nibh mi urna eget vitae lorem.',
      comments: ['comment3 sug1', 'comment4 sug1'],
      dislikes: 55,
      likes: 32,
    },
  ];

  const suggestions2: Suggestion[] = [
    {
      content:
        'sec2 sug1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porta diam cum quisque mi gravida egestas. Feugiat rhoncus, ullamcorper eget massa mi nunc. Auctor sed consequat malesuada cras diam elit. Elementum pellentesque euismod proin dolor. Nibh mi urna eget vitae lorem.',
      comments: ['comment1 sug2', 'comment2 sug2'],
      dislikes: 2,
      likes: 44,
    },
    {
      content:
        'sec2 sug2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porta diam cum quisque mi gravida egestas. Feugiat rhoncus, ullamcorper eget massa mi nunc. Auctor sed consequat malesuada cras diam elit. Elementum pellentesque euismod proin dolor. Nibh mi urna eget vitae lorem.',
      comments: ['comment3 sug2', 'comment4 sug2'],
      dislikes: 11,
      likes: 12,
    },
  ];

  // mock sections
  const sections: SectionProps[] = [
    {
      suggestions: suggestions1,
      sectionIndex: 1,
    },
    {
      suggestions: suggestions2,
      sectionIndex: 2,
    },
  ];

  return (
    <Stack direction="column">
      <Stack
        direction="row"
        sx={{
          borderBottom: ' 1px solid #3f4550',
          paddingBottom: '1.5rem',
        }}
      >
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: '500',
                paddingRight: '0.5rem',
              }}
            >
              {currentCategory || 'categoryName'}
            </Typography>
          </Link>
          <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
            <Stack
              direction="row"
              gap="5px"
              sx={{
                fontSize: '14px',
                alignItems: 'center',
              }}
            >
              <img src={DocLogo} alt="docIcon" width="20rem" height="18px" />
              {localStorage.getItem('agreementName') || 'Agreement Name'}
            </Stack>
          </Link>
        </Breadcrumbs>
      </Stack>
      <Stack direction="column">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ margin: '2rem' }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography sx={{ fontSize: '36px' }} variant="h1">
              {localStorage.getItem('agreementName') || 'Agreement Name'}
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
          {localStorage.getItem('rationale') || 'rationale'}
        </Typography>
      </Stack>
      <Stack direction="column">
        {sections.map((section, index) => {
          return (
            <SectionCard
              suggestions={section.suggestions}
              sectionIndex={section.sectionIndex}
              key={index}
            ></SectionCard>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default AgreementPage;
