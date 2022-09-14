import { Card, IconButton, Stack, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useContext, useState, useMemo } from 'react';
import { ReactComponent as LikeIcon } from 'assets/icons/like-outlined.svg';
import { ReactComponent as DislikeIcon } from 'assets/icons/dislike.svg';
import { ReactComponent as CommentIcon } from 'assets/icons/comment.svg';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { ISection } from 'types/entities';
import { ColorModeAndDirectionContext } from 'theme';
import { StringBank } from 'strings';
import { useTranslation } from 'react-i18next';
import { generateHTML } from '@tiptap/html';
import { JSONContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';

const SectionCard = (props: ISection) => {
  const { t } = useTranslation();
  const { isRTL } = useContext(ColorModeAndDirectionContext);
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

  const currentSuggestion = props.suggestions[suggestionIndex];
  const currentSuggestionHTML = useMemo(() => {
    return generateHTML(currentSuggestion.content as JSONContent, [
      StarterKit,
      Link,
      Placeholder,
      Underline,
      TextAlign,
    ]);
  }, [currentSuggestion]);
  //@todo: XSS filter user-provided HTML?

  return (
    <Card variant="elevation" elevation={0}>
      <Stack direction="row" justifyContent="space-around" alignItems="center">
        <Stack
          flexGrow="1"
          id="rightArrowCol"
          justifyContent="center"
          alignItems="center"
          padding="0 2rem"
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
            {isRTL ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}
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
          <Stack direction="row" gap="1rem">
            <Typography
              variant="body2"
              sx={{
                fontWeight: '700',
                color: '#E0E0E0',
              }}
            >
              {t(StringBank.SECTION_CARD_CONTENT_SECTION_NAME, { sectionNum: props.id + 1 })}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(StringBank.SECTION_CARD_CONTENT_VERSIONS, {
                versionNum: suggestionIndex + 1,
                totalVersionsNum: props.suggestions.length,
              })}
            </Typography>
            <CheckCircleOutlineIcon htmlColor="#24ebd3" />
          </Stack>
          <Stack direction="row">
            <Typography>
              <div dangerouslySetInnerHTML={{ __html: currentSuggestionHTML }} />
            </Typography>
          </Stack>
          <Stack gap="1rem" direction="row">
            <Stack direction="row" justifyContent="center" alignItems="center">
              <IconButton>
                <LikeIcon />
              </IconButton>
              <Typography paddingLeft="4px" paddingRight="4px" color="#24ebd3">
                {currentSuggestion.upvotes}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="center" alignItems="center">
              <IconButton>
                <DislikeIcon />
              </IconButton>
              <Typography paddingLeft="4px" paddingRight="4px">
                {currentSuggestion.downvotes}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="center" alignItems="center">
              <IconButton>
                <CommentIcon />
              </IconButton>
              <Typography paddingLeft="4px" paddingRight="4px">
                {5}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          justifyContent="center"
          alignItems="center"
          padding="0 1rem"
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
            {isRTL ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  );
};

export default SectionCard;
