import { Breadcrumbs, Button, Link, Stack, Typography, Chip } from '@mui/material';
import { AgreementContext } from 'contexts/agreement';
import { FC, useContext } from 'react';
import DocLogo from 'assets/icons/document.svg';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { generateColorFromString } from 'utils/functions';
import { SectionCard } from 'components/SectionCard';
import { IAgreement, IChapter, ISection } from 'types';
import { JSONContent } from '@tiptap/react';
import { ISuggestion } from 'types/entities';

const AgreementPage: FC = () => {
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
      <Stack direction="column">
        {Object.keys(agreemetChaptersData).map((chapterName, i) => {
          const chapter = agreemetChaptersData[chapterName];
          return (
            <Stack direction="column" key={i}>
              <Stack
                direction="row"
                sx={{ marginLeft: '2rem', alignItems: 'center', height: '72px' }}
              >
                <Typography padding="0 0.75rem" fontWeight="500" fontSize="18px">
                  # {chapterName}
                </Typography>
                <Typography fontSize="14px" fontWeight="noraml" color="#adb2b8" padding="0 0.75rem">
                  {Object.keys(chapter).length} sections
                </Typography>
                <Typography fontSize="14px" fontWeight="noraml" color="#adb2b8" padding="0 0.75rem">
                  {calcChapterSuggestions(chapter)} suggestions
                </Typography>
              </Stack>
              <Stack direction="column" rowGap="2rem">
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
