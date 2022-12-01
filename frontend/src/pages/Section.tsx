/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Appbar, Dialog, SvgIcon, TextEditorPopup, CommentsList, AddCommentBox } from 'components';
import { AgreementContext, SectionContext, AuthContext } from 'contexts';
import { DisplaySection } from 'components';
import { FC, useContext, useEffect, useState } from 'react';
import { ReactComponent as DocIcon } from 'assets/icons/document.svg';
import { ReactComponent as EyeIcon } from 'assets/icons/eye.svg';
import { ReactComponent as CheckCircleIcon } from 'assets/icons/check-circle.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { Card, CardContent, Chip, Stack, Grid } from '@mui/material';
import { StringBank } from 'strings';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { textSecondaryColor } from 'theme';
import { Section as SectionType } from 'types';
import { JSONContent } from '@tiptap/react';
import { useAuth0 } from '@auth0/auth0-react';

const Section: FC = () => {
  const { jwt } = useContext(AuthContext);
  const { logout } = useAuth0();
  const [openDialogState, setOpenDialogState] = useState(false);
  const { section, addVersion, fetchComments, comments, deleteComment } =
    useContext(SectionContext);
  const { agreement } = useContext(AgreementContext);
  const { versionId } = useParams();
  const [displayedVersion, setDisplayedVersion] = useState(
    section?.versions?.find((v) => v.id === Number(versionId))
  );
  const { t } = useTranslation();
  const [commentIdToDel, setCommentIdToDel] = useState<number>(-1);
  const [isTextPopupOpen, setIsTextPopupOpen] = useState(false);

  const handleDeleteComment = () => {
    if (jwt) {
      deleteComment!(commentIdToDel);
      setCommentIdToDel(-1);
      setOpenDialogState(false);
    } else {
      logout();
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const section_version_id = displayedVersion?.id;
    if (section_version_id) {
      fetchComments!(section_version_id);
    }
  }, [fetchComments, displayedVersion]);

  useEffect(() => {
    setDisplayedVersion(section?.versions?.find((v) => v.id === Number(versionId)));
  }, [section, versionId]);

  function generateVersionName(section: SectionType | undefined): string {
    const versionNum = (section?.versions?.length ?? NaN) + 1;
    return `${t(StringBank.VERSION)} ${versionNum}`;
  }

  function handleComplete(editorContent: JSONContent) {
    if (!section || !addVersion) {
      return;
    }
    addVersion(editorContent);
    setIsTextPopupOpen(false);
  }
  const handleCloseDialog = () => {
    setOpenDialogState(false);
  };

  return (
    <>
      <Appbar
        breadcrumbs={[
          {
            name: agreement?.name ?? '',
            link: '..',
            icon: DocIcon,
          },
          {
            name: `${t(StringBank.SECTION)} ${section?.index}`,
          },
        ]}
        actions={[
          {
            icon: <EyeIcon />,
            onClick: () => navigate('../draft'),
            title: t(StringBank.VIEW_DRAFT),
          },
        ]}
      />
      <Stack direction="row" gap={1} marginY={2}>
        {section?.versions.map((version, i) => (
          <Chip
            deleteIcon={<CheckCircleIcon />}
            onDelete={version.id === section.current_version?.id ? () => {} : undefined}
            onClick={() => navigate(`../section/${section.id}/${version.id}`)}
            label={`${t(StringBank.VERSION)} ${i + 1}`}
            key={version.id}
            color={displayedVersion === version ? 'primary' : 'default'}
          />
        ))}
        <Chip
          sx={{ '& .MuiChip-label': { paddingX: 0.5, display: 'flex' } }}
          onClick={() => {
            if (jwt) {
              setIsTextPopupOpen(true);
            } else {
              logout();
            }
          }}
          label={
            <SvgIcon htmlColor={textSecondaryColor} width="24px">
              <PlusIcon />
            </SvgIcon>
          }
        />
      </Stack>
      {displayedVersion && (
        <DisplaySection
          setDisplayedVersion={setDisplayedVersion}
          sectionVersions={section?.versions || []}
          displayedVersion={displayedVersion}
          initialVersionId={versionId}
        />
      )}
      {displayedVersion && (
        <Card variant="elevation" elevation={0} sx={{ marginTop: 0.75 }}>
          <CardContent sx={{ padding: 5 }}>
            <Grid container justifyContent="center">
              <Grid item xs={7}>
                <AddCommentBox displayedVersion={displayedVersion} />
                {comments && (
                  <CommentsList comments={comments} displayedVersion={displayedVersion} />
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
      <Dialog
        openDialogState={openDialogState}
        title={t(StringBank.DELETE_AGREEMENT)}
        content={''}
        cancelFunction={handleCloseDialog}
        finishFunction={handleDeleteComment}
        isTextBox={false}
        cancelBtnText={t(StringBank.CANCEL)}
        finishBtnText={t(StringBank.DELETE)}
        placeHolderText={t(StringBank.AGREEMENT_NAME_FIELD)}
        doneBtnVariant="delete"
      />
      <TextEditorPopup
        key={displayedVersion?.id}
        isOpen={isTextPopupOpen}
        parentSection={`${t(StringBank.SECTION)} ${section?.index}`}
        newVersionName={generateVersionName(section)}
        onComplete={handleComplete}
        onCancel={() => setIsTextPopupOpen(false)}
        completeBtnText={t(StringBank.ADD_VERSION)}
        cancelBtnText={t(StringBank.CANCEL)}
        initialContent={displayedVersion?.content}
        editorPlaceholder={t(StringBank.INSERT_NEW_VERSION)}
      />
    </>
  );
};

export default Section;
