import { Breadcrumbs, Button, Link, Stack, Typography, Chip } from '@mui/material';
import { AgreementContext } from 'contexts/agreement';
import { FC, useContext } from 'react';
import DocLogo from 'assets/icons/document.svg';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { generateColorFromString } from 'utils/functions';
import SectionCard from 'components/SectionCard';
import { IAgreement, IChapter, ISection } from 'types';
import { StringBank } from 'strings';
import { useTranslation } from 'react-i18next';
import { DataContext } from 'contexts';

const AgreementPage: FC = () => {
  const { t } = useTranslation();
  const { user } = useContext(DataContext);
  const userId: number | undefined = user?.id;
  const agreementContext = useContext(AgreementContext);
  const currentCategory = agreementContext.categoryName;
  const agreement: IAgreement | undefined = agreementContext.agreement;
  const categoryColor = currentCategory
    ? generateColorFromString(currentCategory, true)
    : 'primary';

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
              {currentCategory || 'categoryName'}
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
                  suggestionsNum: chapter.sections.reduce(
                    (acc, section) => acc + section.versions.length,
                    0
                  ),
                })}
              </Typography>
            </Stack>
            <Stack direction="column" rowGap="2rem" maxWidth="md">
              {chapter?.sections?.map((section: ISection, j: number) => (
                <SectionCard
                  userId={userId || -1}
                  versions={section.versions}
                  key={j}
                  id={section.id}
                />
              ))}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default AgreementPage;
