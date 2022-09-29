import { Button, Stack, Typography, Chip, Box, SvgIcon } from '@mui/material';
import { AgreementContext } from 'contexts/agreement';
import { FC, useContext } from 'react';
import { ReactComponent as DocLogo } from 'assets/icons/document.svg';
import { generateColorFromString } from 'utils/functions';
import { Appbar } from 'components';
import { BreadcrumsProps } from 'components/Appbar';
import { GroupContext } from 'contexts/group';
import SectionCard from 'components/SectionCard';
import { IChapter, ISection } from 'types';
import { StringBank } from 'strings';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const AgreementPage: FC = () => {
  const { t } = useTranslation();
  const { groupSlug } = useParams();
  const { categories } = useContext(GroupContext);
  const { agreement, agreementTitle, categoryName, rationale } = useContext(AgreementContext);
  const currentCategory = categoryName;
  const categoryColor = currentCategory
    ? generateColorFromString(currentCategory, true)
    : 'primary';
  const breadcrumsProps: BreadcrumsProps[] = [
    {
      name: currentCategory || 'categoryName',
      link: `/${groupSlug}/cat/${categories
        .filter((categoryObj) => categoryObj.name === currentCategory)[0]
        ?.id.toString()}`,
    },
    {
      name: agreementTitle || 'Agreement Name',
      icon: DocLogo,
    },
  ];

  return (
    <Stack>
      <Appbar breadcrumsSection={breadcrumsProps} />
      <Stack direction="column" spacing={4}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          marginTop={4}
          maxWidth="md"
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h1" marginRight={2}>
              {agreementTitle || 'Agreement Name'}
            </Typography>
            {currentCategory && (
              <Chip
                label={currentCategory ?? ''}
                size="small"
                sx={{
                  backgroundColor: categoryColor,
                  fontSize: '1rem',
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
        <Typography sx={{ paddingLeft: '1rem' }} variant="body2" maxWidth="md">
          {rationale || 'rationale'}
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
              {chapter?.sections?.map((section: ISection, j: number) => {
                return <SectionCard versions={section.versions} key={j} index={section.index} />;
              })}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default AgreementPage;
