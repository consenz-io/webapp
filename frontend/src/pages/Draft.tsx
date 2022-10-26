import { Box, Typography, Link } from '@mui/material';
import { AgreementContext } from 'contexts/agreement';
import { FC, useContext } from 'react';
import { ReactComponent as DocLogo } from 'assets/icons/document.svg';
import { Appbar, ContentEditor } from 'components';
import { Breadcrumb } from 'components/Appbar';
import { GroupContext } from 'contexts/group';
import { StringBank } from 'strings';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

export const SectionText = styled(ContentEditor)`
  color: ${(props) => props.theme.palette.text.draftText};
`;

const Draft: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { groupSlug, agreementId } = useParams();
  const { categories, slug } = useContext(GroupContext);
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
              ... &nbsp;
              <Link
                component="button"
                onClick={() => navigate(`/${slug}/agreement/${agreementId}`)}
                color="text.draftLink"
                underline="none"
                sx={{ verticalAlign: 'initial' }}
              >
                {t(StringBank.READ_MORE)}
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
                        fontFamily="'NotoSerif', serif"
                        fontSize="0.8125rem"
                        component="h3"
                        color="text.draftTitle"
                      >
                        {`${t(StringBank.SECTION)} ${section.index}`}
                      </Typography>
                      <SectionText readonly initialContent={section.current_version?.content} />
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

export default Draft;
