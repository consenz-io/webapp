/* eslint-disable @typescript-eslint/no-empty-function */
import { Appbar, SvgIcon, TextEditorPopup, DisplaySection } from 'components';
import { AgreementContext, SectionContext } from 'contexts';
import { FC, useContext, useEffect, useState } from 'react';
import { ReactComponent as DocIcon } from 'assets/icons/document.svg';
import { ReactComponent as EyeIcon } from 'assets/icons/eye.svg';
import { ReactComponent as CheckCircleIcon } from 'assets/icons/check-circle.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Snackbar,
  Stack,
  Typography,
  Container,
  Button,
  TextField,
} from '@mui/material';
import { StringBank } from 'strings';
import { BtnCapital } from 'components/DropDownMenu/style';
import { useTranslation } from 'react-i18next';
import { calcTimeAgoFromDate } from 'utils/functions';
import { useNavigate, useParams } from 'react-router-dom';
import { textSecondaryColor } from 'theme';
import { Section as SectionType } from 'types';
import { JSONContent } from '@tiptap/react';

const Section: FC = () => {
  const { section, addVersion, fetchComments, comments, addComment } = useContext(SectionContext);
  const { agreement } = useContext(AgreementContext);
  const { versionId } = useParams();
  const [displayedVersion, setDisplayedVersion] = useState(
    section?.versions?.find((v) => v.id === Number(versionId))
  );
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [isCommentSnackbarVisible, setIsCommentSnackbarVisible] = useState(false);
  const [isTextPopupOpen, setIsTextPopupOpen] = useState(false);
  const [newComment, setNewComment] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const section_version_id = displayedVersion?.id;
    if (section_version_id) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      fetchComments!(section_version_id);
    }
  }, [fetchComments, displayedVersion]);

  useEffect(() => {
    setDisplayedVersion(section?.versions?.find((v) => v.id === Number(versionId)));
  }, [section, versionId]);
  const { t } = useTranslation();

  function generateVersionName(section: SectionType | undefined): string {
    const versionNum = (section?.versions?.length ?? NaN) + 1;
    return `${t(StringBank.VERSION)} ${versionNum}`;
  }

  function handleComplete(editorContent: JSONContent) {
    if (!section || !addVersion) {
      return;
    }
    addVersion({
      variables: {
        content: editorContent,
        sectionId: section.id,
      },
    });
    setIsTextPopupOpen(false);
  }

  function handelAddComment() {
    if (newComment !== '' && addComment && displayedVersion?.author) {
      addComment(newComment, displayedVersion.id);
      setNewComment('');
      setIsCommentSnackbarVisible(true);
    }
    return;
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
      <Stack direction="row" spacing={1} marginY={2}>
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
      {displayedVersion && <DisplaySection displayedVersion={displayedVersion} />}
      {displayedVersion && (
        <Card variant="elevation" elevation={0} sx={{ marginTop: 1 }}>
          <CardContent>
            <Container maxWidth="sm">
              <Stack direction="row" spacing={4}>
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
                  onClick={handelAddComment}
                >
                  {t(StringBank.PUBLISH)}
                </Button>
              </Stack>
              {comments?.map((comment) => (
                <Stack key={comment.id} direction="row" spacing={4} marginBottom={4}>
                  <Stack alignItems="center" paddingTop={1}>
                    <BtnCapital className="capital">
                      {displayedVersion?.author?.full_name?.[0] || t(StringBank.ANONYMOUS)[0]}
                    </BtnCapital>
                  </Stack>
                  <Stack>
                    <Stack direction="row" spacing={2}>
                      <Box>
                        <Typography>{comment.author.full_name}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption">
                          {calcTimeAgoFromDate(comment.created_at)}
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack direction="row">{comment.content}</Stack>
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
