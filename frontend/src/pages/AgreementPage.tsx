import {
  Breadcrumbs,
  Button,
  Link,
  Stack,
  Typography,
  Chip,
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';
import { AgreementContext } from 'contexts/agreement';
import { FC, useContext } from 'react';
import DocLogo from 'assets/icons/document.svg';
import { generateColorFromString } from 'utils/functions';
import SectionCard from 'components/SectionCard';
import { IChapter } from 'types';
import { StringBank } from 'strings';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
      <Stack direction="column" spacing={4} paddingX={2} paddingY={3}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="end">
            <Typography variant="h1" marginRight={2}>
              {agreement?.name}
            </Typography>
            {categoryName && (
              <Chip
                label={categoryName ? categoryName : ''}
                size="small"
                sx={{
                  backgroundColor: categoryColor,
                  marginBlockEnd: 0.5,
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
        <Typography>{agreement?.rationale}</Typography>
        <Box />
        {agreement?.chapters?.map((chapter: IChapter, i: number) => (
          <Accordion
            TransitionProps={{ unmountOnExit: true }}
            key={i}
            sx={{
              '&& .MuiAccordionDetails-root': {
                backgroundColor: '#333842',
              },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: '#333842' }}>
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
            </AccordionSummary>
            <AccordionDetails>
              <Stack direction="column" spacing={2}>
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
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Stack>
  );
};

export default AgreementPage;
