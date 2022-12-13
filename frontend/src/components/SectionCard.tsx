import { IconButton, Stack, Typography, Tooltip, useTheme, LinearProgress } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, { FC, useContext, useState } from 'react';
import { ReactComponent as LikeIcon } from 'assets/icons/like.svg';
import { ReactComponent as DislikeIcon } from 'assets/icons/dislike.svg';
import { ReactComponent as CommentIcon } from 'assets/icons/comment.svg';
import { ReactComponent as CheckCircleIcon } from 'assets/icons/check-circle.svg';
import ContentEditor from 'components/ContentEditor';
import { Section } from 'types/entities';
import { ColorModeAndDirectionContext } from 'theme';
import { StringBank } from 'strings';
import { useTranslation } from 'react-i18next';
import { AgreementContext } from 'contexts/agreement';
import { ClickableCard } from './ClickableCard';
import SvgIcon from './SvgIcon';
import { getRemainingSupporters, getVersionProgress, getVoteColor } from 'utils/functions';
import { useNavigate } from 'react-router-dom';
import { successColor } from 'theme/theme';
import { AuthContext } from 'contexts';
interface Props {
  section: Section;
}

const SectionCard: FC<Props> = ({ section }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isRTL } = useContext(ColorModeAndDirectionContext);
  const { jwt, loginWithRedirect } = useContext(AuthContext);
  const [versionIndex, setVersionIndex] = useState<number>(0);
  const { vote } = useContext(AgreementContext);
  const displayedVersion = section.versions[versionIndex];
  const isCurrentVersionDisplayed = displayedVersion.id === section.current_version?.id;
  const myVote = section.versions[versionIndex].my_vote;
  const theme = useTheme();

  function updateContent(newversionIndex: number) {
    setVersionIndex(newversionIndex);
  }

  function checkIconColor(voteType: 'up' | 'down') {
    return getVoteColor(theme, voteType, myVote);
  }

  function forwardVersion(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    if (versionIndex + 1 < section.versions.length) {
      const newIndex = versionIndex + 1;
      updateContent(newIndex);
    }
  }

  function backwardsVersion(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    if (versionIndex - 1 >= 0) {
      const newIndex = versionIndex - 1;
      updateContent(newIndex);
    }
  }

  function handleVote(type: 'up' | 'down', e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    if (jwt) {
      vote(displayedVersion, type);
    } else {
      loginWithRedirect();
    }
  }

  return (
    <ClickableCard
      variant="elevation"
      elevation={0}
      sx={{ paddingX: 1, cursor: 'pointer' }}
      onClick={() => navigate(`section/${section.id}/${displayedVersion.id}`)}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2}>
        <IconButton onClick={backwardsVersion} disabled={versionIndex === 0}>
          {isRTL ? (
            <ArrowForwardIosIcon fontSize="small" />
          ) : (
            <ArrowBackIosNewIcon fontSize="small" />
          )}
        </IconButton>
        <Stack paddingTop={4} paddingBottom={2} flexGrow={1}>
          <Stack direction="row" gap={2} alignItems="center">
            <Typography
              variant="body2"
              sx={{
                fontWeight: '700',
                color: '#E0E0E0',
              }}
            >
              {t(StringBank.SECTION_CARD_CONTENT_SECTION_NAME, { sectionNum: section.index })}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(StringBank.SECTION_CARD_CONTENT_VERSIONS, {
                versionNum: versionIndex + 1,
                totalVersionsNum: section.versions.length,
              })}
            </Typography>
            {isCurrentVersionDisplayed && (
              <Tooltip title={t(StringBank.CURRENT_VERSION)} arrow placement="top">
                <SvgIcon htmlColor={successColor}>
                  <CheckCircleIcon />
                </SvgIcon>
              </Tooltip>
            )}
          </Stack>
          <ContentEditor content={displayedVersion.content} readonly />
          <Stack gap={2} direction="row" alignItems="center">
            <Stack direction="row" justifyContent="center" alignItems="center" gap={0.5}>
              <IconButton onClick={(e) => handleVote('up', e)}>
                <SvgIcon htmlColor={checkIconColor('up')}>
                  <LikeIcon />
                </SvgIcon>
              </IconButton>
              <Typography color={checkIconColor('up')}>{displayedVersion.upvotes}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="center" alignItems="center" gap={0.5}>
              <IconButton onClick={(e) => handleVote('down', e)}>
                <SvgIcon htmlColor={checkIconColor('down')}>
                  <DislikeIcon />
                </SvgIcon>
              </IconButton>
              <Typography color={checkIconColor('down')}>{displayedVersion.downvotes}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="center" alignItems="center" gap={0.5}>
              <IconButton>
                <SvgIcon htmlColor={theme.palette.text.primary}>
                  <CommentIcon />
                </SvgIcon>
              </IconButton>
              <Typography>{displayedVersion.comment_count}</Typography>
            </Stack>
            <Tooltip
              title={t(StringBank.REMAINING_SUPPORTERS, {
                count: getRemainingSupporters(displayedVersion),
              })}
              arrow
              placement="top"
            >
              <LinearProgress
                variant="determinate"
                value={getVersionProgress(displayedVersion)}
                sx={{ flexGrow: 1 }}
              />
            </Tooltip>
          </Stack>
        </Stack>
        <IconButton
          disabled={versionIndex === section.versions.length - 1}
          onClick={forwardVersion}
        >
          {isRTL ? (
            <ArrowBackIosNewIcon fontSize="small" />
          ) : (
            <ArrowForwardIosIcon fontSize="small" />
          )}
        </IconButton>
      </Stack>
    </ClickableCard>
  );
};

export default SectionCard;
