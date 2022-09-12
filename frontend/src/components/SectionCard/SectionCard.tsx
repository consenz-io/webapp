import { Card, IconButton, Stack, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';
import { ReactComponent as LikeIcon } from 'assets/icons/like-outlined.svg';
import { ReactComponent as DislikeIcon } from 'assets/icons/dislike.svg';
import { ReactComponent as CommentIcon } from 'assets/icons/comment.svg';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ContentEditor from 'components/ContentEditor';
import { ISection, ISuggestion } from 'types/entities';

const SectionCard = (props: ISection) => {
  const [suggestionIndex, setSuggestionIndex] = useState<number>(0);

  const updateContent = (newSuggestionIndex: number) => {
    setSuggestionIndex(newSuggestionIndex);
  };

  const forwardSuggestion = () => {
    if (suggestionIndex + 1 < props.suggestions.length) {
      const newIndex = suggestionIndex + 1;
      updateContent(newIndex);
    }
  };

  const backwardsSuggestion = () => {
    if (suggestionIndex - 1 >= 0) {
      const newIndex = suggestionIndex - 1;
      updateContent(newIndex);
    }
  };

  const CheckedIconRender = (props: { isSelected: boolean }) => {
    if (props.isSelected) {
      return (
        <span>
          <CheckCircleOutlineIcon sx={{ color: '#24ebd3' }} />
        </span>
      );
    }
    return <span></span>;
  };

  return (
    <Card variant="elevation" elevation={0}>
      <Stack direction="row" justifyContent="space-around" alignItems="center">
        <Stack
          flexGrow="1"
          id="rightArrowCol"
          justifyContent="center"
          alignItems="center"
          padding="0 1.5rem"
          direction="column"
          order="1"
        >
          <IconButton
            sx={{
              width: 'min-contnet',
            }}
            onClick={backwardsSuggestion}
            disabled={suggestionIndex === 0}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
        </Stack>
        <Stack
          flexGrow="10"
          id="contentCol"
          justifyContent="center"
          direction="column"
          order="2"
          paddingTop="2rem"
        >
          <Stack direction="row" gap="0.6rem">
            <Typography
              variant="body2"
              sx={{
                fontWeight: '700',
                color: '#E0E0E0',
              }}
            >
              Section {props.id + 1}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
              }}
            >
              Version {suggestionIndex + 1} of {props.suggestions.length}
            </Typography>
            <CheckedIconRender isSelected={true} />
          </Stack>
          <Stack
            direction="row"
            sx={{
              padding: 0,
            }}
          >
            <Typography
              sx={{
                fontWeight: '400',
              }}
            >
              {props.suggestions.map((suggestion: ISuggestion) => {
                if (suggestion.content) {
                  return <ContentEditor initialContent={suggestion.content} readonly={true} />;
                }
              })}
            </Typography>
          </Stack>
          <Stack height="3.5rem" gap="1.5rem" direction="row">
            <Stack direction="row" justifyContent="center" alignItems="center">
              <IconButton>
                <LikeIcon />
              </IconButton>
              <Typography paddingLeft="0.25rem" paddingRight="0.25rem" color="#24ebd3">
                {12}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="center" alignItems="center">
              <IconButton>
                <DislikeIcon />
              </IconButton>
              <Typography paddingLeft="0.25rem" paddingRight="0.25rem">
                {13}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="center" alignItems="center">
              <IconButton>
                <CommentIcon />
              </IconButton>
              <Typography paddingLeft="0.25rem" paddingRight="0.25rem">
                {5}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          justifyContent="center"
          alignItems="center"
          padding="0 1.5rem"
          flexGrow="1"
          id="leftArrowCol"
          direction="column"
          order="3"
        >
          <IconButton
            sx={{
              width: 'min-contnet',
            }}
            disabled={suggestionIndex === props.suggestions.length - 1}
            onClick={forwardSuggestion}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  );
};

export default SectionCard;
