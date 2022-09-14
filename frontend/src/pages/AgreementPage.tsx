import { Button, Stack, Typography, Chip } from '@mui/material';
import { AgreementContext } from 'contexts/agreement';
import { FC, useContext } from 'react';
import { ReactComponent as DocLogo } from 'assets/icons/document.svg';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { generateColorFromString } from 'utils/functions';
import { Appbar } from 'components';
import { BreadcrumsProps } from 'components/Appbar';
import { GroupContext } from 'contexts/group';
import SectionCard from 'components/SectionCard';
import { IChapter, ISection } from 'types';
import { StringBank } from 'strings';
import { useTranslation } from 'react-i18next';

const AgreementPage: FC = () => {
  const { t } = useTranslation();
  const { categories } = useContext(GroupContext);
  const { agreement, categoryName, agreementTitle, agreementId, rationale } =
    useContext(AgreementContext);
  const categoryColor = categoryName ? generateColorFromString(categoryName, true) : 'primary';
  const breadcrumsProps: BreadcrumsProps[] = [
    {
      name: categoryName,
      link:
        categories.filter((categoryObj) => categoryObj.name === categoryName)[0]?.id.toString() ||
        '',
    },
    {
      name: agreementTitle || 'Agreement Name',
      link: agreementId.toString(),
      icon: DocLogo,
    },
  ];

  function calcChapterSuggestions(chapter: IChapter): number {
    return chapter.sections.reduce(
      (acc: number, section: ISection) => acc + section.suggestions.length,
      0
    );
  }

  return (
    <>
      <Appbar breadcrumsSection={breadcrumsProps}></Appbar>
      <Stack direction="column">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ margin: '2rem' }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h1">{agreementTitle}</Typography>
            {categoryName && (
              <Chip
                label={categoryName ?? ''}
                size="small"
                sx={{
                  marginStart: 2,
                  backgroundColor: categoryColor,
                  fontSize: '1rem',
                }}
              />
            )}
          </Stack>
          <Button variant="contained">
            <VisibilityOutlinedIcon />
            <Typography variant="body1"> View Agreement</Typography>
          </Button>
        </Stack>
        <Typography sx={{ paddingLeft: '4rem' }} variant="body2">
          {rationale || 'rationale'}
        </Typography>
      </Stack>
      <Stack direction="column">
        {agreement?.chapters?.map((chapter, i) => {
          return (
            <Stack direction="column" key={i}>
              <Stack direction="row" alignItems="center" height="4rem" columnGap="1rem">
                <Typography variant="h3">
                  {t(StringBank.SECTION_CARD_TITLE_CHAPTER, { chapterName: chapter })}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t(StringBank.SECTION_CARD_TITLE_SECTIONS, {
                    sectionNum: chapter.sections.length,
                  })}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t(StringBank.SECTION_CARD_TITLE_SUGGESTIONS, {
                    suggestionsNum: calcChapterSuggestions(chapter),
                  })}
                </Typography>
              </Stack>
              <Stack direction="column" rowGap="2rem" maxWidth="md">
                {chapter.sections.map((section, j) => {
                  return (
                    <SectionCard suggestions={section.suggestions} key={j} id={j}></SectionCard>
                  );
                })}
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </>
  );
};

export default AgreementPage;
