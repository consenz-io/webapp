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
import { debounce, generateColorFromString } from 'utils/functions';
import { Appbar, TextEditorPopup } from 'components';
import { Breadcrumb } from 'components/Appbar';
import { GroupContext } from 'contexts/group';
import SectionCard from 'components/SectionCard';
import { Chapter, Section } from 'types';
import { StringBank } from 'strings';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate, useParams } from 'react-router-dom';
import { inputBackgroundColor, secondaryDarkColor } from 'theme/theme';
import { JSONContent } from '@tiptap/react';
import { AuthContext } from 'contexts';

const Agreement: FC = () => {
  const { t } = useTranslation();
  const { groupSlug, agreementId } = useParams();
  const { categories, slug, id: groupId } = useContext(GroupContext);
  const { jwt, loginWithRedirect } = useContext(AuthContext);
  const [isTextPopupOpen, setIsTextPopupOpen] = useState(false);
  const {
    agreement,
    categoryName,
    canEditAgreement,
    addSection,
    vote,
    setCurrentChapterId,
    setCurrentSectionIndex,
    updateAgreement,
  } = useContext(AgreementContext);
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

  if (agreement?.name) {
    document.title = `${agreement.name}`;
  }

  function handleFieldUpdate(field: 'name' | 'rationale', value: string) {
    debounce(() => updateAgreement({ [field]: value }), 1000);
  }

  async function handleComplete(editorContent: JSONContent) {
    const { versions } = await addSection(editorContent);
    await vote(versions[0], 'up');
    setIsTextPopupOpen(false);
  }

  function handleAddSection(chapter: Chapter, section: Section | null) {
    if (!jwt) {
      return loginWithRedirect({
        joinGroupId: groupId,
        redirectTo: window.location.pathname,
      });
    }
    setCurrentChapterId(chapter.id);
    if (section) {
      setCurrentSectionIndex(section.index + 1);
    } else {
      setCurrentSectionIndex(chapter?.sections[0].index);
    }
    setIsTextPopupOpen(true);
  }

  return (
    <Stack>
      <Appbar breadcrumbs={breadcrumsProps} />
      <Stack gap={4} paddingX={2} paddingY={3}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="end" gap={1.5}>
            <Typography
              variant="h1"
              contentEditable={canEditAgreement}
              suppressContentEditableWarning
              onInput={({ currentTarget }) => handleFieldUpdate('name', currentTarget.innerText)}
            >
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
        <Typography
          contentEditable={canEditAgreement}
          suppressContentEditableWarning
          onInput={({ currentTarget }) => handleFieldUpdate('rationale', currentTarget.innerText)}
        >
          {agreement?.rationale}
        </Typography>
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
                <Stack direction="row" alignItems="center" height="4rem" gap={2}>
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
                  padding: 0,
                }}
              >
                <Stack gap={0}>
                  <Divider className="divider" textAlign="center" variant="fullWidth">
                    <IconButton
                      onClick={() => {
                        handleAddSection(chapter, null);
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
                            handleAddSection(chapter, section);
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
                    </div>
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      </Stack>
      <TextEditorPopup
        isOpen={isTextPopupOpen}
        parentSection={t(StringBank.NEW_SECTION)}
        onComplete={handleComplete}
        onCancel={() => setIsTextPopupOpen(false)}
        completeBtnText={t(StringBank.ADD_SECTION)}
        cancelBtnText={t(StringBank.CANCEL)}
        editorPlaceholder={t(StringBank.INSERT_NEW_SECTION_SHORT)}
      />
    </Stack>
  );
};

export default Agreement;
