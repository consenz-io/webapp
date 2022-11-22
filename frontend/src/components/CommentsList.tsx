import { FC } from 'react';
import { Comment, Version } from 'types/entities';
import { Box, Stack, Typography } from '@mui/material';
import { StringBank } from 'strings';
import { BtnCapital } from './DropDownMenu/style';
import { calcTimeAgoFromDate } from 'utils/functions';
import { useTranslation } from 'react-i18next';

interface CommentsListProps {
  comments: Comment[];
  displayedVersion: Version;
}

const CommentsList: FC<CommentsListProps> = ({ comments, displayedVersion }) => {
  const { t } = useTranslation();

  return (
    <>
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
                <Typography variant="caption">{calcTimeAgoFromDate(comment.created_at)}</Typography>
              </Box>
            </Stack>
            <Stack direction="row">{comment.content}</Stack>
          </Stack>
        </Stack>
      ))}
    </>
  );
};

export default CommentsList;
