import { Breadcrumbs, Button, Link, Stack, Typography, Chip } from '@mui/material';
import { AgreementContext } from 'contexts/agreement';
import { FC, useContext } from 'react';
import DocLogo from 'assets/icons/document.svg';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { generateColorFromString } from 'utils/functions';
import SectionCard from 'components/SectionCard';
import { IAgreement, IChapter, ISection } from 'types';
import { JSONContent } from '@tiptap/react';
import { ISuggestion } from 'types/entities';
import { StringBank } from 'strings';
import { useTranslation } from 'react-i18next';

const AgreementPage: FC = () => {
  const { t } = useTranslation();
  const agreementContext = useContext(AgreementContext);
  const currentCategory = agreementContext.categoryName;
  const agreement: IAgreement | undefined = agreementContext.agreement;
  const agreemetChaptersData = generateChaptersData();
  const categoryColor = currentCategory
    ? generateColorFromString(currentCategory, true)
    : 'primary';
  const handleClick = (e: any) => {
    e.preventDefault();
    console.log('clicked breadcrumb');
  };
  // orgenzie real data to: chapter -> sections: suggestions
  function generateChaptersData() {
    const chaptersData: {
      [key: string]: { [key: string]: ISuggestion[] };
    } = {};
    if (agreement && agreement.chapters && agreement.chapters.length > 0) {
      agreement.chapters.forEach((chapter: IChapter) => {
        chaptersData[chapter.name] = {};
        if (chapter.sections && chapter.sections.length > 0) {
          chapter.sections.forEach((section: ISection, j: number) => {
            const sectionName = `section ${j + 1}`;
            chaptersData[chapter.name][sectionName] = [];
            if (section.suggestions && section.suggestions.length > 0) {
              section.suggestions.forEach((suggestionObj: any, k: number) => {
                const content: JSONContent = suggestionObj.content;
                const suggestion: ISuggestion = {
                  content,
                  id: k + 1,
                };
                chaptersData[chapter.name][sectionName].push(suggestion);
              });
            }
          });
        }
      });
    }
    return chaptersData;
  }

  function calcChapterSuggestions(chapter: any) {
    let suggestionsNum = 0;
    Object.keys(chapter).forEach((sectionName: string) => {
      const section: object = chapter[sectionName];
      suggestionsNum += Object.keys(section).length;
    });
    return suggestionsNum;
  }

  return (
    <Stack direction="column">
      <Stack
        direction="row"
        sx={{
          borderBottom: '1px solid #3f4550',
          paddingBottom: '1.5rem',
        }}
      >
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
            <Typography
              sx={{
                fontSize: '0.87rem',
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
              gap="0.3rem"
              sx={{
                fontSize: '0.87rem',
                alignItems: 'center',
              }}
            >
              <img src={DocLogo} alt="docIcon" width="20rem" height="18px" />
              {agreementContext.agreementTitle || 'Agreement Name'}
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
            <Typography variant="h1">
              {agreementContext.agreementTitle || 'Agreement Name'}
            </Typography>
            {currentCategory && (
              <Chip
                label={currentCategory ? currentCategory : ''}
                size="small"
                style={{
                  marginLeft: '1rem',
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
          {agreementContext.rationale || 'rationale'}
        </Typography>
      </Stack>
      <Stack direction="column">
        {Object.keys(agreemetChaptersData).map((chapterName: string, i: number) => {
          const chapter = agreemetChaptersData[chapterName];
          return (
            <Stack direction="column" key={i}>
              <Stack direction="row" alignItems="center" height="4rem" columnGap="1rem">
                <Typography variant="h3">
                  {t(StringBank.SECTION_CARD_TITLE_CHAPTER, { chapterName })}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t(StringBank.SECTION_CARD_TITLE_SECTIONS, {
                    sectionNum: Object.keys(chapter).length,
                  })}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t(StringBank.SECTION_CARD_TITLE_SUGGESTIONS, {
                    suggestionsNum: calcChapterSuggestions(chapter),
                  })}
                </Typography>
              </Stack>
              <Stack direction="column" rowGap="2rem" maxWidth="md">
                {Object.keys(chapter).map((sectionName: string, j: number) => {
                  const section = chapter[sectionName];
                  return <SectionCard suggestions={section} key={j} id={j}></SectionCard>;
                })}
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default AgreementPage;
