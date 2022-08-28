import { Slide, Typography } from '@mui/material';
import { SectionProps } from './types';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';
import * as SC from './styles';
import { ReactComponent as LikeIcon } from 'assets/icons/like-outlined.svg';
import { ReactComponent as DislikeIcon } from 'assets/icons/dislike.svg';
import { ReactComponent as CommentIcon } from 'assets/icons/comment.svg';

const SectionCard = (props: SectionProps) => {
  const [content, setContent] = useState<string>(props.suggestions[0].content);
  const [suggestionIndex, setSuggestionIndex] = useState<number>(0);

  const updateContent = (newSuggestionIndex: number) => {
    setSuggestionIndex(newSuggestionIndex);
    setContent(props.suggestions[newSuggestionIndex].content);
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

  return (
    <SC.Card>
      <SC.ButtonColumn direction="column" order="1" width="64px">
        <IconButton
          sx={{
            paddingLeft: '1rem',
          }}
          onClick={backwardsSuggestion}
          disabled={suggestionIndex === 0}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
      </SC.ButtonColumn>
      <SC.SectionDataColumn direction="column" order="2">
        <SC.SectionDataRow direction="row">
          <Typography
            sx={{
              fontWeight: '700',
              fontSize: '14px',
              color: '#E0E0E0',
            }}
          >
            Section {props.sectionIndex}
          </Typography>
          <Typography
            sx={{
              fontSize: '14px',
              color: '#adb2b8',
            }}
          >
            Version {suggestionIndex + 1} of {props.suggestions.length}
          </Typography>
        </SC.SectionDataRow>
        <SC.SectionDataRow direction="row">
          <Typography
            sx={{
              fontWeight: '400',
              color: 'white',
              paddingTop: '19.5px',
            }}
          >
            <Slide direction="right">
              <>{content}</>
            </Slide>
          </Typography>
        </SC.SectionDataRow>
        <SC.SectionButtonsRow direction="row">
          <SC.iconNumberContainter>
            <LikeIcon />
            <Typography paddingLeft="4px" paddingRight="4px" color="#24ebd3">
              {props.suggestions[suggestionIndex].likes}
            </Typography>
          </SC.iconNumberContainter>
          <SC.iconNumberContainter>
            <DislikeIcon />
            <Typography paddingLeft="4px" paddingRight="4px">
              {props.suggestions[suggestionIndex].dislikes}
            </Typography>
          </SC.iconNumberContainter>
          <SC.iconNumberContainter>
            <CommentIcon />
            <Typography paddingLeft="4px" paddingRight="4px">
              {props.suggestions[suggestionIndex].comments.length}
            </Typography>
          </SC.iconNumberContainter>
        </SC.SectionButtonsRow>
      </SC.SectionDataColumn>
      <SC.ButtonColumn direction="column" order="3">
        <IconButton
          sx={{
            paddingRight: '1rem',
          }}
          disabled={suggestionIndex === props.suggestions.length - 1}
          onClick={forwardSuggestion}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </SC.ButtonColumn>
    </SC.Card>
  );
};

export default SectionCard;
