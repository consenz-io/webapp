import { FC, useContext, useState } from 'react';
import { Box, Snackbar, Stack, Button, TextField } from '@mui/material';
import { BtnCapital } from './DropDownMenu/style';
import { StringBank } from 'strings';
import { useTranslation } from 'react-i18next';
import { Version } from 'types';
import { AuthContext, SectionContext } from 'contexts';

interface AddCommentBoxProps {
  displayedVersion: Version;
}

const AddCommentBox: FC<AddCommentBoxProps> = ({ displayedVersion }) => {
  const { t } = useTranslation();
  const [newComment, setNewComment] = useState<string>('');
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const { addComment } = useContext(SectionContext);
  const { jwt, loginWithRedirect } = useContext(AuthContext);

  function handleAddComment() {
    if (jwt) {
      if (!newComment || !addComment || !displayedVersion) {
        return;
      }
      addComment(newComment, displayedVersion.id);
      setNewComment('');
      setIsSnackbarVisible(true);
      setTimeout(() => {
        setIsSnackbarVisible(false);
      }, 3500);
    } else {
      loginWithRedirect();
    }
  }

  return (
    <>
      <Stack direction="row" gap={4}>
        <Box sx={{ paddingTop: 0.5 }}>
          <BtnCapital className="capital" color="main" large>
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
        <Button disabled={!newComment} sx={{ paddingX: 0, marginY: 1 }} onClick={handleAddComment}>
          {t(StringBank.PUBLISH)}
        </Button>
      </Stack>
      <Snackbar
        open={isSnackbarVisible}
        message={t(StringBank.COMMENT_POSTED)}
        onClose={() => {
          setIsSnackbarVisible(false);
        }}
      />
    </>
  );
};

export default AddCommentBox;
