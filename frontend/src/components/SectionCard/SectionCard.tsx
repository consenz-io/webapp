import { Typography } from '@mui/material';
import { SectionProps } from './types';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';
import * as SC from './styles';

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
      <SC.SectionColumn direction="column" order="1">
        <IconButton
          sx={{
            position: 'relative',
            left: '0',
          }}
          onClick={backwardsSuggestion}
          disabled={suggestionIndex === 0}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
      </SC.SectionColumn>
      <SC.SectionColumn direction="column" order="2">
        <SC.SectionDataRow direction="row">
          <Typography
            sx={{
              fontWeight: '700',
              fontSize: '14px',
              color: '#E0E0E0',
              padding: '0 10px',
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
            }}
          >
            {content}
          </Typography>
        </SC.SectionDataRow>
        <SC.SectionDataRow direction="row">buttons</SC.SectionDataRow>
      </SC.SectionColumn>
      <SC.SectionColumn direction="column" order="3">
        <IconButton
          disabled={suggestionIndex === props.suggestions.length - 1}
          onClick={forwardSuggestion}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </SC.SectionColumn>
    </SC.Card>
  );
};

export default SectionCard;
