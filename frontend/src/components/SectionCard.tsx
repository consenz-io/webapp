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
import { AgreementContext } from 'contexts/agreement';
import { IAgreementContext } from 'types';

const SectionCard = (props: ISection) => {
  const { t } = useTranslation();
  const { isRTL } = useContext(ColorModeAndDirectionContext);
  const [versionIndex, setversionIndex] = useState<number>(0);
  const agreementContext: IAgreementContext = useContext(AgreementContext);
  const { vote } = agreementContext;
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

  const displayedVersion = props.versions[versionIndex];
  const isCurrentVersionDisplayed = displayedVersion.id === props.current_version?.id;

  return (
    <Card variant="elevation" elevation={0} sx={{ paddingX: 1 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <IconButton onClick={backwardsVersion} disabled={versionIndex === 0}>
          {isRTL ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}
        </IconButton>
        <Stack paddingTop={4} paddingBottom={2} flexGrow={1}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography
              variant="body2"
              sx={{
                fontWeight: '700',
                color: '#E0E0E0',
              }}
            >
              {t(StringBank.SECTION_CARD_CONTENT_SECTION_NAME, { sectionNum: props.index })}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(StringBank.SECTION_CARD_CONTENT_VERSIONS, {
                versionNum: versionIndex + 1,
                totalVersionsNum: props.versions.length,
              })}
            </Typography>
            {isCurrentVersionDisplayed && (
              <CheckCircleOutlineIcon htmlColor="#24ebd3" fontSize="inherit" />
            )}
          </Stack>
          <ContentEditor initialContent={displayedVersion.content} readonly />
          <Stack gap="1rem" direction="row">
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5}>
              <IconButton sx={{ padding: '0' }}>
                <LikeIcon
                  onClick={() => {
                    vote(displayedVersion.id, 'up');
                  }}
                />
              </IconButton>
              <Typography color="#24ebd3">{displayedVersion.upvotes}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5}>
              <IconButton sx={{ padding: '0' }}>
                <DislikeIcon
                  onClick={() => {
                    vote(displayedVersion.id, 'down');
                  }}
                />
              </IconButton>
              <Typography>{displayedVersion.downvotes}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5}>
              <IconButton size="small">
                <CommentIcon />
              </IconButton>
              <Typography>{5}</Typography>
            </Stack>
          </Stack>
        </Stack>
        <IconButton disabled={versionIndex === props.versions.length - 1} onClick={forwardVersion}>
          {isRTL ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
        </IconButton>
      </Stack>
    </Card>
  );
};

export default SectionCard;
