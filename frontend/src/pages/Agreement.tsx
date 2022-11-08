import {
  Button,
  Stack,
  Typography,
  Chip,
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  SvgIcon,
  Divider,
  IconButton,
} from '@mui/material';
import { AgreementContext } from 'contexts/agreement';
import { FC, useContext, useState } from 'react';
import './Agreement.css';
import { ReactComponent as DocLogo } from 'assets/icons/document.svg';
import PlusIcon from 'assets/icons/plus.svg';
import { generateColorFromString } from 'utils/functions';
import { Appbar, TextEditorPopup } from 'components';
import { Breadcrumb } from 'components/Appbar';
import { GroupContext } from 'contexts/group';
import SectionCard from 'components/SectionCard';
import { Chapter } from 'types';
import { StringBank } from 'strings';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { addSection as insertSectionMutation } from 'utils/mutations';
import { inputBackgroundColor, secondaryDarkColor } from 'theme/theme';

const Agreement: FC = () => {
  const { t } = useTranslation();
  const { groupSlug, agreementId } = useParams();
  const { categories, slug } = useContext(GroupContext);
  const [isTextPopupOpen, setIsTextPopupOpen] = useState(false);
  const { agreement, categoryName } = useContext(AgreementContext);
  const [addSection] = useMutation(insertSectionMutation, {
    refetchQueries: ['section', 'agreement'],
    awaitRefetchQueries: true,
  });
  const navigate = useNavigate();
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
      <Stack spacing={4} paddingX={2} paddingY={3}>
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
          <Button
            variant="contained"
            onClick={() => navigate(`/${slug}/agreement/${agreementId}/draft`)}
          >
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
          {agreement?.chapters?.map((chapter: Chapter) => (
            <Accordion
              TransitionProps={{ unmountOnExit: true }}
              defaultExpanded
              key={chapter.index}
              sx={{
                boxShadow: 'none',
                position: 'static',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  backgroundColor: inputBackgroundColor,
                  borderBottom: `1px solid ${secondaryDarkColor}`,
                  height: '4.5rem',
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
              <AccordionDetails
                sx={{
                  backgroundColor: inputBackgroundColor,
                  paddingX: 0,
                }}
              >
                <Stack spacing={0}>
                  <Divider
                    className="divider"
                    textAlign="center"
                    variant="fullWidth"
                    sx={{ paddingBottom: 1 }}
                  >
                    <IconButton
                      onClick={() => {
                        setIsTextPopupOpen(true);
                      }}
                      sx={{
                        border: '1px solid gray',
                        width: '15px',
                        height: '15px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <img src={PlusIcon} height="10px" width="10px" />
                    </IconButton>
                  </Divider>
                  {chapter?.sections?.map((section) => (
                    <div key={section.id}>
                      <SectionCard section={section} />
                      <Divider className="divider" textAlign="center" variant="fullWidth">
                        <IconButton
                          onClick={() => {
                            setIsTextPopupOpen(true);
                          }}
                          sx={{
                            border: '1px solid gray',
                            width: '15px',
                            height: '15px',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <img src={PlusIcon} height="10px" width="10px" />
                        </IconButton>
                      </Divider>
                      <TextEditorPopup
                        isOpen={isTextPopupOpen}
                        parentSection={t(StringBank.NEW_SECTION)}
                        onComplete={(editorContent) => {
                          const content = editorContent.variables.content;
                          const variables = {
                            chapterId: chapter.id,
                            sectionIndex: section.index + 1,
                            versions: {
                              content,
                            },
                          };
                          addSection({ variables });
                        }}
                        onCancel={setIsTextPopupOpen}
                        completeBtnText={t(StringBank.ADD_VERSION)}
                        cancelBtnText={t(StringBank.CANCEL)}
                        editorPlaceholder={t(StringBank.INSERT_NEW_SECTION_SHORT)}
                      />
                    </div>
                  ))}
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
