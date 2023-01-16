import { Appbar, Dialog, SvgIcon, TextEditorPopup, CommentsList, AddCommentBox } from 'components';
import { AgreementContext, SectionContext } from 'contexts';
import { DisplayedVersion } from 'components';
import { FC, useContext, useEffect, useState } from 'react';
import { ReactComponent as DocIcon } from 'assets/icons/document.svg';
import { ReactComponent as EyeIcon } from 'assets/icons/eye.svg';
import { ReactComponent as CheckCircleIcon } from 'assets/icons/check-circle.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { Card, CardContent, Chip, Stack, Container } from '@mui/material';
import { StringBank } from 'strings';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { textSecondaryColor } from 'theme';
import { Section as SectionType } from 'types';
import { JSONContent } from '@tiptap/react';
import { AuthContext } from 'contexts';
import { GroupContext } from 'contexts/group';

const Section: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { section, addVersion, fetchComments, comments, deleteComment, deleteSectionVersion } =
    useContext(SectionContext);
  const { id: groupId } = useContext(GroupContext);
  const { agreement, vote } = useContext(AgreementContext);
  const { jwt, loginWithRedirect } = useContext(AuthContext);
  const { versionId } = useParams();
  const [commentIdToDel, setCommentIdToDel] = useState<number>(-1);
  const [displayedVersion, setDisplayedVersion] = useState(
    section?.versions?.find((v) => v.id === Number(versionId))
  );
  const [isTextPopupOpen, setIsTextPopupOpen] = useState(false);
  const [openDialogState, setOpenDialogState] = useState(false);

  const displayedVersionIndex = section?.versions?.findIndex(
    (version) => version.id === displayedVersion?.id
  );

  const handleDeleteComment = () => {
    deleteComment(commentIdToDel);
    setCommentIdToDel(-1);
    setOpenDialogState(false);
  };

  useEffect(() => {
    const section_version_id = displayedVersion?.id;
    if (section_version_id) {
      fetchComments(section_version_id);
    }
  }, [fetchComments, displayedVersion]);

  useEffect(() => {
    setDisplayedVersion(section?.versions?.find((v) => v.id === Number(versionId)));
  }, [section, versionId]);

  function generateVersionName(section: SectionType | undefined): string {
    const versionNum = (section?.versions?.length ?? NaN) + 1;
    return `${t(StringBank.VERSION)} ${versionNum}`;
  }

  async function handleComplete(editorContent: JSONContent) {
    if (!section || !addVersion) {
      return;
    }
    const newVersion = await addVersion(editorContent);
    await vote(newVersion, 'up');
    setIsTextPopupOpen(false);
    navigate(`../section/${section.id}/${newVersion.id}`);
  }

  const handleCloseDialog = () => {
    setOpenDialogState(false);
  };

  function handleAddVersion() {
    if (!jwt) {
      return loginWithRedirect({
        redirectTo: window.location.pathname,
        joinGroupId: groupId,
      });
    }
    setIsTextPopupOpen(true);
  }

  function goToNextVerion(): void {
    if (!section || displayedVersionIndex === undefined || displayedVersionIndex < 0) {
      return;
    }
    const desiredIndex =
      displayedVersionIndex + 1 >= section.versions.length ? 0 : displayedVersionIndex + 1;
    navigate(`../section/${section.id}/${section.versions[desiredIndex].id}`);
  }

  function goToPreviousVerion(): void {
    if (!section || displayedVersionIndex === undefined || displayedVersionIndex < 0) {
      return;
    }
    const desiredIndex =
      displayedVersionIndex - 1 < 0 ? section.versions.length - 1 : displayedVersionIndex - 1;
    navigate(`../section/${section.id}/${section.versions[desiredIndex].id}`);
  }

  function deleteVersion(): void {
    if (!displayedVersion) {
      return;
    }
    deleteSectionVersion(displayedVersion.id);
    goToNextVerion();
  }

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
            {...(version.id === section.current_version?.id && { icon: <CheckCircleIcon /> })}
            onClick={() => navigate(`../section/${section.id}/${version.id}`)}
            label={`${t(StringBank.VERSION)} ${i + 1}`}
            key={version.id}
            color={displayedVersion === version ? 'primary' : 'default'}
          />
        ))}
        <Chip
          sx={{ '& .MuiChip-label': { paddingX: 0.5, display: 'flex' } }}
          onClick={handleAddVersion}
          label={
            <SvgIcon htmlColor={textSecondaryColor} width="24px">
              <PlusIcon />
            </SvgIcon>
          }
        />
      </Stack>
      {displayedVersion && (
        <DisplayedVersion
          onDelete={deleteVersion}
          onNextClick={goToNextVerion}
          onPreviousClick={goToPreviousVerion}
          sectionVersions={section?.versions || []}
          displayedVersion={displayedVersion}
          initialVersionId={versionId}
        />
      )}
      {displayedVersion && (
        <Card variant="elevation" elevation={0} sx={{ marginTop: 1 }}>
          <CardContent sx={{ padding: 3 }}>
            <Container maxWidth="sm">
              <AddCommentBox displayedVersion={displayedVersion} />
              {comments && <CommentsList comments={comments} />}
            </Container>
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
