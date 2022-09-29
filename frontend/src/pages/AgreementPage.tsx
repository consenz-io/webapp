import { Breadcrumbs, Button, Link, Stack, Typography, Chip, Box } from '@mui/material';
import { AgreementContext } from 'contexts/agreement';
import { FC, useContext } from 'react';
import DocLogo from 'assets/icons/document.svg';
import { generateColorFromString } from 'utils/functions';
import SectionCard from 'components/SectionCard';
import { IChapter } from 'types';
import { StringBank } from 'strings';
import { useTranslation } from 'react-i18next';

const AgreementPage: FC = () => {
  const { t } = useTranslation();
  const { agreement, categoryName } = useContext(AgreementContext);
  const categoryColor = categoryName ? generateColorFromString(categoryName, true) : 'primary';

  return (
    <Stack>
      <Stack
        direction="row"
        sx={{
          borderBottom: '1px solid #3f4550',
          paddingBottom: '1.5rem',
        }}
      >
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          <Link underline="hover" key="1" color="inherit" href="/">
            <Typography
              variant="body2"
              sx={{
                fontWeight: '500',
                paddingRight: '0.5rem',
              }}
            >
              {categoryName}
            </Typography>
          </Link>
          <Link underline="hover" key="1" color="inherit" href="/">
            <Stack
              spacing={1}
              direction="row"
              sx={{
                fontSize: '0.87rem',
                alignItems: 'center',
              }}
            >
              <img src={DocLogo} alt="docIcon" width="20rem" height="18px" />
              {agreement?.name}
            </Stack>
          </Link>
        </Breadcrumbs>
      </Stack>
      <Stack direction="column" spacing={4}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          marginTop={4}
          maxWidth="md"
        >
          <Stack direction="row" alignItems="end" justifyContent="space-between">
            <Typography variant="h1" marginRight={2}>
              {agreement?.name}
            </Typography>
            {categoryName && (
              <Chip
                label={categoryName ? categoryName : ''}
                size="small"
                sx={{
                  backgroundColor: categoryColor,
                  marginY: 0.5,
                }}
              />
            )}
          </Stack>
          <Button variant="contained">
            <img src={DocLogo} alt="docIcon" />
            <Typography sx={{ paddingX: '.5rem' }} variant="h6">
              {t(StringBank.VIEW_CURRENT_DRAFT)}
            </Typography>
          </Button>
        </Stack>
        <Typography sx={{ paddingLeft: '1rem' }} variant="body2" maxWidth="md">
          {agreement?.rationale}
        </Typography>
        <Box />
      </Stack>
      <Stack direction="column">
        {agreement?.chapters?.map((chapter: IChapter, i: number) => (
          <Stack direction="column" key={i}>
            <Stack direction="row" alignItems="center" height="4rem" columnGap="1rem">
              <Typography variant="h3">
                {t(StringBank.SECTION_CARD_TITLE_CHAPTER, { chapterName: chapter.name })}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t(StringBank.SECTION_CARD_TITLE_SECTIONS, {
                  sectionNum: chapter.sections?.length,
                })}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t(StringBank.SECTION_CARD_TITLE_VERSIONS, {
                  versionsNum: chapter.sections.reduce(
                    (acc, section) => acc + section.versions.length,
                    0
                  ),
                })}
              </Typography>
            </Stack>
            <Stack direction="column" rowGap="2rem" maxWidth="md">
              {chapter?.sections?.map((section, j: number) => {
                return (
                  <SectionCard
                    versions={section.versions}
                    key={j}
                    index={section.index}
                    current_version={section.current_version}
                  />
                );
              })}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default AgreementPage;
