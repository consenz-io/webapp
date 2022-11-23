/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Appbar, ContentEditor, Dialog, SvgIcon, TextEditorPopup } from 'components';
import { AgreementContext, AuthContext, DataContext, SectionContext } from 'contexts';
import { FC, useContext, useEffect, useState } from 'react';
import { ReactComponent as DocIcon } from 'assets/icons/document.svg';
import { ReactComponent as EyeIcon } from 'assets/icons/eye.svg';
import { ReactComponent as CheckCircleIcon } from 'assets/icons/check-circle.svg';
import { ReactComponent as LinkIcon } from 'assets/icons/link.svg';
import { ReactComponent as LikeIcon } from 'assets/icons/like.svg';
import { ReactComponent as DislikeIcon } from 'assets/icons/dislike.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { ReactComponent as TrashIcon } from 'assets/icons/trash-2.svg';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  LinearProgress,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
  Container,
  useTheme,
  TextField,
  Link,
} from '@mui/material';
import { StringBank } from 'strings';
import { BtnCapital } from 'components/DropDownMenu/style';
import { useTranslation } from 'react-i18next';
import {
  calcTimeAgoFromDate,
  getRemainingSupporters,
  getVersionProgress,
  getVoteColor,
} from 'utils/functions';
import { useNavigate, useParams } from 'react-router-dom';
import { backgroundBorderColor, textSecondaryColor } from 'theme';
import { Section as SectionType, Version } from 'types';
import { JSONContent } from '@tiptap/react';

const Section: FC = () => {
  const { role } = useContext(AuthContext);
  const { user } = useContext(DataContext);

  const theme = useTheme();
  const [openDialogState, setOpenDialogState] = useState(false);
  const {
    section,
    addVersion,
    fetchComments,
    comments,
    addComment,
    deleteComment,
    deleteSectionVersion,
  } = useContext(SectionContext);
  const { agreement, vote } = useContext(AgreementContext);
  const { versionId } = useParams();
  const [displayedVersion, setDisplayedVersion] = useState<Version | undefined>(
    section?.versions?.find((v) => v.id === Number(versionId))
  );
  const { t } = useTranslation();
  const [dialogContent, setDialogContent] = useState<string>('');
  const [commentIdToDel, setCommentIdToDel] = useState<number>(-1);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [isCommentSnackbarVisible, setIsCommentSnackbarVisible] = useState(false);
  const [isTextPopupOpen, setIsTextPopupOpen] = useState(false);

  const handleDeleteComment = () => {
    deleteComment!(commentIdToDel);
    setCommentIdToDel(-1);
    setOpenDialogState(false);
  };

  const [newComment, setNewComment] = useState<string>('');
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

  function handleShare() {
    navigator.clipboard.writeText(window.location.href);
    setIsSnackbarVisible(true);
  }

  function getIconColor(voteType: 'up' | 'down'): string {
    return getVoteColor(theme, voteType, displayedVersion?.my_vote);
  }

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

  function checkAuthorOrModerator(authorId: number) {
    return role === 'moderator' || (user && user.id === authorId);
  }

  const handleClickOpenDialog = () => {
    setOpenDialogState(true);
  };
  const handleCloseDialog = () => {
    setOpenDialogState(false);
  };

  function handleAddComment() {
    if (!newComment || !addComment || !displayedVersion) {
      return;
    }
    addComment(newComment, displayedVersion.id);
    setNewComment('');
    setIsCommentSnackbarVisible(true);
  }

  function handleDelSectionVersion() {
    if (displayedVersion) {
      deleteSectionVersion!(displayedVersion.id);
    }
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
            setIsTextPopupOpen(true);
          }}
          label={
            <SvgIcon htmlColor={textSecondaryColor} width="24px">
              <PlusIcon />
            </SvgIcon>
          }
        />
        <TextEditorPopup
          key={displayedVersion?.id}
          isOpen={isTextPopupOpen}
          parentSection={`${t(StringBank.SECTION)} ${section?.index}`}
          newVersionName={generateVersionName(section)}
          onComplete={handleComplete}
          onCancel={setIsTextPopupOpen}
          completeBtnText={t(StringBank.ADD_VERSION)}
          cancelBtnText={t(StringBank.CANCEL)}
          initialContent={displayedVersion?.content}
          editorPlaceholder={t(StringBank.INSERT_NEW_VERSION)}
        />
      </Stack>
      {displayedVersion && (
        <Card variant="elevation" elevation={0}>
          <CardContent sx={{ paddingX: 3 }}>
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" alignItems="center" gap={2}>
                <BtnCapital className="capital">
                  {displayedVersion?.author?.full_name?.[0] || t(StringBank.ANONYMOUS)[0]}
                </BtnCapital>
                <Typography variant="h6">
                  {displayedVersion?.author?.full_name || t(StringBank.ANONYMOUS)}
                </Typography>
                <Typography variant="caption">
                  {displayedVersion?.created_at?.toLocaleDateString(navigator.language)}
                </Typography>
              </Stack>
              <Stack direction="row">
                <IconButton size="small" onClick={handleShare}>
                  <SvgIcon htmlColor={textSecondaryColor}>
                    <LinkIcon />
                  </SvgIcon>
                </IconButton>
                {displayedVersion?.author?.id &&
                  checkAuthorOrModerator(displayedVersion.author.id) && (
                    <IconButton
                      size="small"
                      onClick={handleDelSectionVersion}
                      disabled={comments ? comments.length > 0 : false}
                    >
                      <SvgIcon
                        htmlColor={
                          comments && comments.length > 0
                            ? backgroundBorderColor
                            : textSecondaryColor
                        }
                      >
                        <TrashIcon />
                      </SvgIcon>
                    </IconButton>
                  )}
              </Stack>
            </Stack>
            <Box paddingY={4}>
              <ContentEditor readonly content={displayedVersion?.content} />
            </Box>
            <Stack gap={1} direction="row" alignItems="center">
              <Stack direction="row" justifyContent="center" alignItems="center" gap={0.5}>
                <IconButton onClick={() => displayedVersion && vote(displayedVersion, 'up')}>
                  <SvgIcon htmlColor={getIconColor('up')}>
                    <LikeIcon />
                  </SvgIcon>
                </IconButton>
                <Typography color={getIconColor('up')}>{displayedVersion?.upvotes}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="center" alignItems="center" gap={0.5}>
                <IconButton onClick={() => displayedVersion && vote(displayedVersion, 'down')}>
                  <SvgIcon htmlColor={getIconColor('down')}>
                    <DislikeIcon />
                  </SvgIcon>
                </IconButton>
                <Typography color={getIconColor('down')}>{displayedVersion?.downvotes}</Typography>
              </Stack>
              <Tooltip
                title={t(StringBank.REMAINING_SUPPORTERS, {
                  count: getRemainingSupporters(displayedVersion),
                })}
                arrow
                placement="top"
              >
                <LinearProgress
                  variant="determinate"
                  value={getVersionProgress(displayedVersion)}
                  sx={{ flexGrow: 1 }}
                />
              </Tooltip>
            </Stack>
          </CardContent>
        </Card>
      )}
      {displayedVersion && (
        <Card variant="elevation" elevation={0} sx={{ marginTop: 1 }}>
          <CardContent>
            <Container maxWidth="sm">
              <Stack direction="row" gap={4}>
                <Box sx={{ paddingTop: 0.5 }}>
                  <BtnCapital className="capital" color="main">
                    {displayedVersion?.author?.full_name?.[0] || t(StringBank.ANONYMOUS)[0]}
                  </BtnCapital>
                </Box>
                <TextField
                  placeholder={t(StringBank.ADD_COMMENT_IN_SECTION)}
                  value={newComment}
                  onChange={(data) => setNewComment(data.target.value)}
                  minRows={3}
                  multiline
                  fullWidth
                />
              </Stack>
              <Stack direction="row" justifyContent="end">
                <Button
                  disabled={!newComment}
                  sx={{ paddingX: 0, marginY: 1 }}
                  onClick={handleAddComment}
                >
                  {t(StringBank.PUBLISH)}
                </Button>
              </Stack>
              {comments?.map((comment) => (
                <Stack key={comment.id} direction="row" gap={4} marginBottom={4}>
                  <Stack alignItems="center" paddingTop={1}>
                    <BtnCapital className="capital">
                      {displayedVersion?.author?.full_name?.[0] || t(StringBank.ANONYMOUS)[0]}
                    </BtnCapital>
                  </Stack>
                  <Stack>
                    <Stack direction="row" gap={2}>
                      <Box>
                        <Typography>{comment.author.full_name}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption">
                          {calcTimeAgoFromDate(comment.created_at)}
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography>{comment.content}</Typography>
                    {checkAuthorOrModerator(comment.author.id) && (
                      <Stack direction="row">
                        <Link
                          component="button"
                          variant="caption"
                          underline="hover"
                          color={textSecondaryColor}
                          onClick={() => {
                            setDialogContent(t(StringBank.CONFIRM_COMMENT_DELETE));
                            setCommentIdToDel(comment.id);
                            handleClickOpenDialog();
                          }}
                        >
                          {t(StringBank.DELETE)}
                        </Link>
                      </Stack>
                    )}
                  </Stack>
                </Stack>
              ))}
            </Container>
          </CardContent>
        </Card>
      )}
      <Snackbar
        open={isSnackbarVisible}
        message={t(StringBank.URL_COPIED_SUCCESSFULLY)}
        autoHideDuration={4000}
        onClose={() => setIsSnackbarVisible(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
      <Dialog
        openDialogState={openDialogState}
        title={t(StringBank.DELETE_COMMNET)}
        content={dialogContent}
        cancelFunction={handleCloseDialog}
        finishFunction={handleDeleteComment}
        cancelBtnText={t(StringBank.CANCEL)}
        finishBtnText={t(StringBank.DELETE)}
        placeHolderText={t(StringBank.AGREEMENT_NAME_FIELD)}
        doneBtnVariant="delete"
      />
      <Snackbar
        open={isCommentSnackbarVisible}
        message={t(StringBank.COMMNET_POSTED)}
        autoHideDuration={4000}
        onClose={() => setIsCommentSnackbarVisible(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </>
  );
};

export default Section;
