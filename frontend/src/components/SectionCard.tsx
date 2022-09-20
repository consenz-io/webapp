import { Card, IconButton, Stack, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useContext, useState } from 'react';
import { ReactComponent as LikeIcon } from 'assets/icons/like-outlined.svg';
import { ReactComponent as DislikeIcon } from 'assets/icons/dislike.svg';
import { ReactComponent as CommentIcon } from 'assets/icons/comment.svg';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ContentEditor from 'components/ContentEditor';
import { ISection } from 'types/entities';
import { ColorModeAndDirectionContext } from 'theme';
import { StringBank } from 'strings';
import { useTranslation } from 'react-i18next';

const SectionCard = (props: ISection) => {
  const { t } = useTranslation();
  const { isRTL } = useContext(ColorModeAndDirectionContext);
  const [versionIndex, setversionIndex] = useState<number>(0);

  const updateContent = (newversionIndex: number) => {
    setversionIndex(newversionIndex);
  };

  const forwardVersion = () => {
    if (versionIndex + 1 < props.versions.length) {
      const newIndex = versionIndex + 1;
      updateContent(newIndex);
    }
  };

  const backwardsVersion = () => {
    if (versionIndex - 1 >= 0) {
      const newIndex = versionIndex - 1;
      updateContent(newIndex);
    }
  };

  const currentVersion = props.versions[versionIndex];

  return (
    <Card variant="elevation" elevation={0}>
      <Stack direction="row" justifyContent="space-around">
        <Stack
          id="rightArrowCol"
          justifyContent="center"
          alignItems="center"
          direction="column"
          minWidth="4rem"
        >
          <IconButton
            sx={{
              width: 'min-contnet',
            }}
            onClick={backwardsVersion}
            disabled={versionIndex === 0}
          >
            {isRTL ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}
          </IconButton>
        </Stack>
        <Stack id="contentCol" justifyContent="center" direction="column" paddingY="2rem">
          <Stack direction="row" spacing={2} alignItems="center">
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
                versionNum: versionIndex + 1,
                totalVersionsNum: props.versions.length,
              })}
            </Typography>
            <CheckCircleOutlineIcon htmlColor="#24ebd3" fontSize="inherit" />
          </Stack>
          <Stack direction="row">
            <Typography>
              <ContentEditor
                key={currentVersion.id}
                initialContent={currentVersion.content}
                readonly={true}
              />
            </Typography>
          </Stack>
          <Stack gap="1rem" direction="row">
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5}>
              <IconButton sx={{ padding: '0' }}>
                <LikeIcon />
              </IconButton>
              <Typography color="#24ebd3">{currentVersion.upvotes}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5}>
              <IconButton sx={{ padding: '0' }}>
                <DislikeIcon />
              </IconButton>
              <Typography>{currentVersion.downvotes}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5}>
              <IconButton sx={{ padding: '0' }}>
                <CommentIcon />
              </IconButton>
              <Typography>{5}</Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          id="leftArrowCol"
          justifyContent="center"
          alignItems="center"
          direction="column"
          minWidth="4rem"
        >
          <IconButton
            sx={{
              width: 'min-contnet',
            }}
            disabled={versionIndex === props.versions.length - 1}
            onClick={forwardVersion}
          >
            {isRTL ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  );
};

export default SectionCard;
