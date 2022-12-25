import { FC, useContext, useState } from 'react';
import { Comment, Role } from 'types/entities';
import { Box, Link, Stack, Typography } from '@mui/material';
import { StringBank } from 'strings';
import { BtnCapital } from './DropDownMenu/style';
import { calcTimeAgoFromDate } from 'utils/functions';
import { useTranslation } from 'react-i18next';
import Dialog from './Dialog';
import { AuthContext, UserContext, SectionContext } from 'contexts';
import { textSecondaryColor } from 'theme';

interface CommentsListProps {
  comments: Comment[];
}

const CommentsList: FC<CommentsListProps> = ({ comments }) => {
  const { t } = useTranslation();
  const [dialogContent, setDialogContent] = useState<string>('');
  const [commentIdToDel, setCommentIdToDel] = useState<number>(-1);
  const [openDialogState, setOpenDialogState] = useState(false);
  const { deleteComment } = useContext(SectionContext);
  const { role } = useContext(AuthContext);
  const { user } = useContext(UserContext);

  function checkAuthorOrModerator(authorId: number) {
    return role === Role.MODERATOR || (user && user.id === authorId);
  }
  function onDeleteComment(commentId: number) {
    deleteComment(commentId);
    setCommentIdToDel(-1);
  }
  const handleClickOpenDialog = () => {
    setOpenDialogState(true);
  };
  const handleCloseDialog = () => {
    setOpenDialogState(false);
  };
  const handelDeleteComment = () => {
    onDeleteComment(commentIdToDel);
    setOpenDialogState(false);
  };
  return (
    <>
      {comments?.map((comment) => (
        <Stack key={comment.id} direction="row" gap={4} marginBottom={4}>
          <Stack alignItems="center" paddingTop={1}>
            <BtnCapital className="capital" large>
              {comment.author?.full_name?.[0] || t(StringBank.ANONYMOUS)[0]}
            </BtnCapital>
          </Stack>
          <Stack>
            <Stack direction="row" gap={2}>
              {comment.author.full_name && (
                <Box>
                  <Typography>{comment.author.full_name}</Typography>
                </Box>
              )}
              <Box>
                <Typography variant="caption">
                  {calcTimeAgoFromDate(comment.created_at, t)}
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row">{comment.content}</Stack>
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
      <Dialog
        openDialogState={openDialogState}
        title={t(StringBank.DELETE_COMMENT)}
        content={dialogContent}
        cancelFunction={handleCloseDialog}
        finishFunction={handelDeleteComment}
        isTextBox={false}
        cancelBtnText={t(StringBank.CANCEL)}
        finishBtnText={t(StringBank.DELETE)}
        placeHolderText={t(StringBank.AGREEMENT_NAME_FIELD)}
        doneBtnVariant="delete"
      />
    </>
  );
};

export default CommentsList;
