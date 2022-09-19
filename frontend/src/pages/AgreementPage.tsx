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
import { IAgreement, IChapter } from 'types';
import { StringBank } from 'strings';
import { useTranslation } from 'react-i18next';

const AgreementPage: FC = () => {
  const { t } = useTranslation();
  const { categories } = useContext(GroupContext);
  const agreementContext = useContext(AgreementContext);
  const currentCategory = agreementContext.categoryName;
  const agreement: IAgreement | undefined = agreementContext.agreement;
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
      name: agreement?.name || '',
      link: agreement?.id.toString() || '',
      icon: DocLogo,
    },
  ];

  return (
    <Stack>
      <Appbar breadcrumsSection={breadcrumsProps} />
      <Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ margin: '2rem' }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h1">{agreement?.name}</Typography>
            {currentCategory && (
              <Chip
                label={currentCategory ?? ''}
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
          {agreement?.rationale}
        </Typography>
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
                {t(StringBank.SECTION_CARD_TITLE_SUGGESTIONS, {
                  suggestionsNum: chapter.sections.reduce(
                    (acc, section) => acc + section.suggestions.length,
                    0
                  ),
                })}
              </Typography>
            </Stack>
            <Stack direction="column" rowGap="2rem" maxWidth="md">
              {chapter?.sections?.map((section, j: number) => (
                <SectionCard suggestions={section.suggestions} key={j} id={section.id} />
              ))}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default AgreementPage;
