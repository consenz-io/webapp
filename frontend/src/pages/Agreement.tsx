import {
  // Breadcrumbs,
  Button,
  // Link,
  Stack,
  Typography,
  Chip,
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  SvgIcon,
} from '@mui/material';
import { AgreementContext } from 'contexts/agreement';
import { FC, useContext } from 'react';
import { ReactComponent as DocLogo } from 'assets/icons/document.svg';
import { generateColorFromString } from 'utils/functions';
import { Appbar } from 'components';
import { Breadcrumb } from 'components/Appbar';
import { GroupContext } from 'contexts/group';
import SectionCard from 'components/SectionCard';
import { IChapter } from 'types';
import { StringBank } from 'strings';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { generateRandString } from 'utils/functions';
import { useParams } from 'react-router-dom';

const Agreement: FC = () => {
  const { t } = useTranslation();
  const { groupSlug } = useParams();
  const { categories } = useContext(GroupContext);
  const { agreement, categoryName } = useContext(AgreementContext);
  const breadcrumsProps: Breadcrumb[] = [
    {
      name: categoryName || t(StringBank.UNCATEGORIZED),
      link: `/${groupSlug}/cat/${categories
        .find((categoryObj) => categoryObj.name === categoryName)
        ?.id.toString()}`,
    },
    {
      name: agreement?.name ?? '',
      icon: DocLogo,
    },
  ];

  return (
    <Stack>
      <Appbar breadcrumbs={breadcrumsProps} />
      <Stack direction="column" spacing={4} paddingX={2} paddingY={3}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="end">
            <Typography variant="h1" marginRight={2}>
              {agreement?.name}
            </Typography>
            {categoryName && (
              <Chip
                label={categoryName}
                size="small"
                sx={{
                  backgroundColor: generateColorFromString(categoryName, true),
                  marginBlockEnd: 0.5,
                }}
              />
            )}
          </Stack>
          <Button variant="contained">
            <SvgIcon>
              <DocLogo />
            </SvgIcon>
            <Typography sx={{ paddingX: '.5rem' }} variant="h6">
              {t(StringBank.VIEW_CURRENT_DRAFT)}
            </Typography>
          </Button>
        </Stack>
        <Typography>{agreement?.rationale}</Typography>
        <Box />
        <Stack>
          {agreement?.chapters?.map((chapter: IChapter) => (
            <Accordion
              TransitionProps={{ unmountOnExit: true }}
              defaultExpanded={true}
              key={chapter.index}
              sx={{
                boxShadow: 'none',
                position: 'static',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  backgroundColor: '#333842',
                  borderBottom: '1px solid #3f4550',
                  height: '4.5rem',
                  padding: '0',
                }}
              >
                <Stack direction="row" alignItems="center" height="4rem" columnGap="1rem">
                  <Typography variant="h3">
                    {t(StringBank.SECTION_CARD_TITLE_CHAPTER, { chapterName: chapter.name })}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ wordSpacing: '0.2rem' }}>
                    {t(StringBank.SECTION_CARD_TITLE_SECTIONS, {
                      sectionNum: chapter.sections?.length,
                    })}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ wordSpacing: '0.2rem' }}>
                    {t(StringBank.SECTION_CARD_TITLE_VERSIONS, {
                      versionsNum: chapter.sections.reduce(
                        (acc, section) => acc + section.versions.length,
                        0
                      ),
                    })}
                  </Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: '#333842' }}>
                <Stack direction="column" spacing={2}>
                  {chapter?.sections?.map((section) => {
                    return (
                      <SectionCard
                        versions={section.versions}
                        key={generateRandString()}
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
    </Stack>
  );
};

export default Agreement;
