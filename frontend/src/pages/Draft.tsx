import { Box, Typography, Container, Button, Stack, Link } from '@mui/material';
import { AgreementContext } from 'contexts/agreement';
import { FC, useContext, useEffect, useState } from 'react';
import { ReactComponent as DocLogo } from 'assets/icons/document.svg';
import { Appbar, ContentEditor } from 'components';
import { Breadcrumb } from 'components/Appbar';
import { GroupContext } from 'contexts/group';
import { StringBank } from 'strings';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { truncateAfterWords } from 'utils/functions';

export const SectionText = styled(ContentEditor)`
  color: ${(props) => props.theme.palette.text.draftText};
  font-family: 'NotoSerif', serif;
  font-weight: 400;
`;

const Draft: FC = () => {
  const { t } = useTranslation();
  const { groupSlug } = useParams();
  const { categories } = useContext(GroupContext);
  const { agreement, categoryName } = useContext(AgreementContext);
  const [displayedRationale, setDisplayedRationale] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setDisplayedRationale(truncateAfterWords(agreement?.rationale ?? '', 30));
  }, [agreement]);

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
      link: `/${groupSlug}/agreement/${agreement?.id}`,
    },
  ];

  return (
    <>
      <Appbar breadcrumbs={breadcrumbsProps} />
      <Container>
        <Box px={{ sm: 4, lg: 17 }} py={{ sm: 4, lg: 9 }}>
          <Box
            width="21cm"
            maxWidth="100%"
            height="auto"
            bgcolor="background.draftPaper"
            px={6}
            pt={6}
            pb={4}
            minHeight="29.4cm"
          >
            <Box
              textAlign="center"
              pb={5}
              mb={5}
              px={4}
              borderBottom="1px solid"
              borderColor="border.main"
            >
              <Typography
                component="h1"
                align="center"
                color="text.draftPrimary"
                variant="h2"
                mb={2}
              >
                {agreement?.name}
              </Typography>
              <Typography align="center" color="text.draftPrimary" variant="body2" mb={2}>
                {`${displayedRationale} `}
                {displayedRationale.length < (agreement?.rationale?.length || 0) && (
                  <Link
                    component="button"
                    onClick={() => setDisplayedRationale(agreement?.rationale ?? '')}
                    color="text.draftLink"
                    underline="none"
                    sx={{ verticalAlign: 'initial' }}
                  >
                    {t(StringBank.READ_MORE)}
                  </Link>
                )}
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
                  date: agreement?.updated_at?.toLocaleDateString(),
                })}
              </Typography>
            </Box>
            {agreement?.chapters?.some((c) => c.sections?.some((s) => s.current_version)) ? (
              agreement?.chapters?.map(
                (chapter, i) =>
                  chapter.sections.some((section) => section.current_version) && (
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
                      {chapter.sections.map(
                        (section, idx) =>
                          section.current_version && (
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
                                  <SectionText
                                    readonly
                                    content={section.current_version?.content}
                                  />
                                </Box>
                              </Typography>
                            </div>
                          )
                      )}
                    </div>
                  )
              )
            ) : (
              <Container maxWidth="xs">
                <Typography
                  textAlign="center"
                  color="text.draftText"
                  variant="h6"
                  mb={2}
                  fontWeight={700}
                >
                  {t(StringBank.NO_SECTIONS_TITLE)}
                </Typography>
                <Typography color="black" textAlign="center" variant="body2" maxWidth="xs">
                  {t(StringBank.NO_SECTIONS_PARAGRAPH)}
                </Typography>
              </Container>
            )}
          </Box>
        </Box>
      </Container>
      <Stack direction="row" position="sticky" bottom={0} padding={2} justifyContent="center">
        <Button
          variant="contained"
          size="large"
          color="primary"
          sx={{ boxShadow: 4 }}
          onClick={() => navigate(`/${groupSlug}/agreement/${agreement?.id}`)}
        >
          {t(StringBank.PARTICIPATE_IN_DISCUSSION)}
        </Button>
      </Stack>
    </>
  );
};

export default Draft;
