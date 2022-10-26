import { Box, Typography, Link } from '@mui/material';
import { AgreementContext } from 'contexts/agreement';
import { FC, useContext } from 'react';
import { ReactComponent as DocLogo } from 'assets/icons/document.svg';
import { Appbar } from 'components';
import { Breadcrumb } from 'components/Appbar';
import { GroupContext } from 'contexts/group';
import { StringBank } from 'strings';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const Agreement: FC = () => {
  const { t } = useTranslation();
  const { groupSlug } = useParams();
  const { categories } = useContext(GroupContext);
  const { agreement, categoryName } = useContext(AgreementContext);
  const breadcrumbsProps: Breadcrumb[] = [
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
    <>
      <Appbar breadcrumbs={breadcrumbsProps} />
      <Box px={{ sm: 4, lg: 17 }} py={{ sm: 4, lg: 9 }}>
        <Box width="100%" height="auto" bgcolor={'background.draftPaper'} px={6} pt={6} pb={4}>
          <Box
            textAlign="center"
            pb={5}
            mb={5}
            px={4}
            borderBottom="1px solid"
            borderColor="border.main"
          >
            <Typography component="h1" align="center" color="text.draftPrimary" variant="h2" mb={2}>
              {agreement?.name}
            </Typography>
            <Typography align="center" color="text.draftPrimary" variant="body2" mb={2}>
              {agreement?.rationale}
              <Link href="#" color="text.draftLink" underline="none">
                ... {t(StringBank.READ_MORE)}
              </Link>
            </Typography>
            <Typography
              component="span"
              color="text.draftDate"
              variant="body2"
              mb={2}
              fontWeight={500}
            >
              {t(StringBank.AGREEMENT_LAST_UPDATED, {
                interpolation: { escapeValue: false },
                date: agreement
                  ? new Date(agreement.updated_at).toLocaleString(navigator.language, {
                      month: 'numeric',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : '',
              })}
            </Typography>
          </Box>
          {agreement?.chapters?.map((chapter, i) => (
            <div key={i}>
              <Typography
                component="h2"
                color="text.draftText"
                variant="h4"
                mb={3}
                fontWeight={700}
              >
                {chapter.name}
              </Typography>
              {chapter.sections.map((section, idx) => (
                <div key={idx}>
                  <Typography
                    component="h2"
                    color="text.draftText"
                    variant="h4"
                    mb={3}
                    fontWeight={700}
                  >
                    <Box mb={3}>
                      <Typography
                        fontFamily="NotoSerif"
                        fontSize="0.8125rem"
                        component="h3"
                        color="text.draftTitle"
                      >
                        {`${t(StringBank.SECTION)} ${section.index}`}
                      </Typography>
                      <Typography
                        fontFamily="NotoSerif"
                        fontSize="0.8125rem"
                        color="text.draftText"
                        mb={1}
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                      </Typography>
                    </Box>
                  </Typography>
                </div>
              ))}
            </div>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Agreement;
