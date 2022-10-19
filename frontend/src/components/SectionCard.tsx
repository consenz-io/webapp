import { IconButton, Stack, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, { FC, useContext, useState } from 'react';
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
import { ClickableCard } from './ClickableCard';

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

  function updateContent(newversionIndex: number) {
    setVersionIndex(newversionIndex);
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
              <CheckCircleOutlineIcon htmlColor="#24ebd3" fontSize="inherit" />
            )}
          </Stack>
          <ContentEditor initialContent={displayedVersion.content} readonly />
          <Stack gap="1rem" direction="row">
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5}>
              <IconButton onClick={(e) => handleVote('up', e)}>
                <LikeIcon />
              </IconButton>
              <Typography color="#24ebd3">{displayedVersion.upvotes}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5}>
              <IconButton onClick={(e) => handleVote('down', e)}>
                <DislikeIcon />
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
