import { IconButton, Stack, Typography, Tooltip, useTheme } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, { FC, useContext, useState } from 'react';
import { ReactComponent as LikeIcon } from 'assets/icons/like-uncolored.svg';
import { ReactComponent as DislikeIcon } from 'assets/icons/dislike.svg';
import { ReactComponent as CommentIcon } from 'assets/icons/comment.svg';
import { ReactComponent as CheckCircleIcon } from 'assets/icons/check-circle.svg';
import ContentEditor from 'components/ContentEditor';
import { ISection } from 'types/entities';
import { ColorModeAndDirectionContext } from 'theme';
import { StringBank } from 'strings';
import { useTranslation } from 'react-i18next';
import { AgreementContext } from 'contexts/agreement';
import { IAgreementContext } from 'types';
import { ClickableCard } from './ClickableCard';
import SvgIcon from './SvgIcon';

interface Props {
  onClick: () => void;
  section: ISection;
}

const SectionCard: FC<Props> = ({ section, onClick }) => {
  const { t } = useTranslation();
  const { isRTL } = useContext(ColorModeAndDirectionContext);
  const [versionIndex, setVersionIndex] = useState<number>(0);
  const agreementContext: IAgreementContext = useContext(AgreementContext);
  const { vote } = agreementContext;
  const displayedVersion = section.versions[versionIndex];
  const isCurrentVersionDisplayed = displayedVersion.id === section.current_version?.id;
  const myVote = section.versions[versionIndex].my_vote;
  function updateContent(newversionIndex: number) {
    setVersionIndex(newversionIndex);
  }
  const mode = useTheme().palette.mode;
  function checkIconColor(voteType: 'up' | 'down' | 'comment') {
    let color;
    let regularColor;
    switch (mode) {
      case 'light':
        regularColor = 'black';
        break;
      case 'dark':
        regularColor = '';
        break;
    }
    if (voteType === 'up') {
      color = myVote === 'up' ? '#24ebd3' : regularColor;
    } else if (voteType === 'down') {
      color = myVote === 'down' ? '#ff5a82' : regularColor;
    } else {
      return regularColor;
    }
    return color;
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
    vote(displayedVersion.id, type);
  }

  return (
    <ClickableCard
      variant="elevation"
      elevation={0}
      sx={{ paddingX: 1, cursor: 'pointer' }}
      onClick={onClick}
    >
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
                <SvgIcon htmlColor="#24ebd3">
                  <CheckCircleIcon />
                </SvgIcon>
              </Tooltip>
            )}
          </Stack>
          <ContentEditor initialContent={displayedVersion.content} readonly />
          <Stack gap="1rem" direction="row">
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5}>
              <IconButton onClick={(e) => handleVote('up', e)}>
                <SvgIcon htmlColor={checkIconColor('up')}>
                  <LikeIcon />
                </SvgIcon>
              </IconButton>
              <Typography color={checkIconColor('up')}>{displayedVersion.upvotes}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5}>
              <IconButton onClick={(e) => handleVote('down', e)}>
                <SvgIcon htmlColor={checkIconColor('down')}>
                  <DislikeIcon />
                </SvgIcon>
              </IconButton>
              <Typography color={checkIconColor('down')}>{displayedVersion.downvotes}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5}>
              <IconButton size="small">
                <SvgIcon htmlColor={checkIconColor('comment')}>
                  <CommentIcon />
                </SvgIcon>
              </IconButton>
              <Typography>{5}</Typography>
            </Stack>
          </Stack>
        </Stack>
        <IconButton
          disabled={versionIndex === section.versions.length - 1}
          onClick={forwardVersion}
        >
          {isRTL ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
        </IconButton>
      </Stack>
    </ClickableCard>
  );
};

export default SectionCard;
