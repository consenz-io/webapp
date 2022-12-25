import {
  Card,
  CardContent,
  IconButton,
  LinearProgress,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { SvgIcon, Dialog } from 'components';
import React, { Dispatch, FC, SetStateAction, useContext, useState } from 'react';
import { BtnCapital } from './DropDownMenu/style';
import { ReactComponent as LinkIcon } from 'assets/icons/link.svg';
import { ReactComponent as DislikeIcon } from 'assets/icons/dislike.svg';
import { ReactComponent as TrashIcon } from 'assets/icons/trash-2.svg';
import { ReactComponent as LikeIcon } from 'assets/icons/like.svg';
import { useTranslation } from 'react-i18next';
import ContentEditor from './ContentEditor';
import { Role, Version } from 'types/entities';
import { backgroundBorderColor, textSecondaryColor } from 'theme';
import { getVoteColor, getRemainingSupporters, getVersionProgress } from 'utils/functions';
interface DisplayProns {
  displayedVersion: Version;
  sectionVersions: Version[];
  setDisplayedVersion: Dispatch<SetStateAction<Version | undefined>>;
  initialVersionId: string | undefined;
}
import { StringBank } from 'strings';
import {
  AgreementContext,
  AuthContext,
  UserContext,
  SectionContext,
  SettingsContext,
} from 'contexts';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const DisplaySection: FC<DisplayProns> = ({
  sectionVersions,
  displayedVersion,
  setDisplayedVersion,
}) => {
  const theme = useTheme();
  const { vote } = useContext(AgreementContext);
  const { role } = useContext(AuthContext);
  const { user } = useContext(UserContext);
  const { isRTL } = useContext(SettingsContext);
  const { t } = useTranslation();
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [currentVersionIndex, setCurrentVersionIndex] = useState<number>(
    sectionVersions.findIndex((v) => v.id === displayedVersion.id)
  );
  const { deleteSectionVersion, comments } = useContext(SectionContext);
  const [dialogContent, setDialogContent] = useState<string>('');
  const [dialogTitle, setDialogTitle] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogFinishFN, setDialogFinishFN] = useState<(val: string) => void>(() =>
    setIsDialogOpen(false)
  );

  function getIconColor(voteType: 'up' | 'down'): string {
    return getVoteColor(theme, voteType, displayedVersion?.my_vote);
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  function handleDelSectionVersion() {
    if (displayedVersion) {
      deleteSectionVersion?.(displayedVersion.id);
    }
    setIsDialogOpen(false);
  }

  function checkAuthorOrModerator(authorId: number) {
    return role === Role.MODERATOR || (user && user.id === authorId);
  }

  function handleShare() {
    navigator.clipboard.writeText(window.location.href);
    setIsSnackbarVisible(true);
    setTimeout(() => {
      setIsSnackbarVisible(false);
    }, 5000);
  }

  function changeDisplayedVersion(type: 'right' | 'left') {
    switch (type) {
      case 'right':
        if (currentVersionIndex <= sectionVersions.length) {
          const newVersion = sectionVersions[currentVersionIndex + 1];
          if (newVersion) {
            setCurrentVersionIndex(currentVersionIndex + 1);
            setDisplayedVersion(newVersion);
          }
        }
        break;
      case 'left':
        if (currentVersionIndex > 0) {
          const newVersion = sectionVersions[currentVersionIndex - 1];
          setCurrentVersionIndex(currentVersionIndex - 1);
          setDisplayedVersion(newVersion);
        }
        break;
    }
  }

  return (
    <>
      <Card variant="elevation" elevation={0}>
        <CardContent sx={{ paddingX: 3 }}>
          <Stack
            id="title"
            direction="row"
            justifyContent="space-between"
            sx={{ marginLeft: isRTL ? '0' : '0.6rem', marginRight: isRTL ? '0.6rem' : '0' }}
            marginBottom={2}
          >
            <Stack direction="row" alignItems="center" gap={2.5}>
              <BtnCapital className="capital">
                {displayedVersion?.author?.full_name?.[0] || t(StringBank.ANONYMOUS)[0]}
              </BtnCapital>
              <Typography variant="h6">
                {displayedVersion?.author?.full_name || t(StringBank.ANONYMOUS)}
              </Typography>
              <Typography variant="caption">
                {displayedVersion?.created_at?.toLocaleDateString(navigator.language)}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap={1}>
              <IconButton size="small" onClick={handleShare}>
                <SvgIcon htmlColor={textSecondaryColor}>
                  <LinkIcon />
                </SvgIcon>
              </IconButton>

              {checkAuthorOrModerator(displayedVersion.author?.id || -1) && (
                <IconButton
                  size="small"
                  onClick={() => {
                    setDialogTitle(t(StringBank.DELETE_SECTION_VERSION));
                    setDialogContent(t(StringBank.CONFIRM_SECTION_VERSION_DELETE));
                    setDialogFinishFN(() => {
                      return handleDelSectionVersion;
                    });
                    setIsDialogOpen(true);
                  }}
                  disabled={!!comments?.length}
                >
                  <SvgIcon
                    htmlColor={comments?.length ? backgroundBorderColor : textSecondaryColor}
                  >
                    <TrashIcon />
                  </SvgIcon>
                </IconButton>
              )}
            </Stack>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={3}
          >
            <IconButton
              onClick={() => changeDisplayedVersion('left')}
              disabled={currentVersionIndex - 1 < 0}
            >
              {isRTL ? (
                <ArrowForwardIosIcon sx={{ fontSize: '1rem' }} />
              ) : (
                <ArrowBackIosNewIcon sx={{ fontSize: '1rem' }} />
              )}
            </IconButton>
            <Stack id="contentNVotingColoumn" width="85%" justifyContent="center">
              <Stack
                id="content"
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <ContentEditor readonly content={displayedVersion?.content} />
              </Stack>
            </Stack>
            <IconButton
              disabled={currentVersionIndex + 1 >= sectionVersions.length}
              onClick={() => {
                changeDisplayedVersion('right');
              }}
            >
              {isRTL ? (
                <ArrowBackIosNewIcon sx={{ fontSize: '1rem' }} />
              ) : (
                <ArrowForwardIosIcon sx={{ fontSize: '1rem' }} />
              )}
            </IconButton>
          </Stack>
          <Stack id="voting" direction="row" gap={2} maxWidth="85%" marginX="auto">
            <Stack direction="row" justifyContent="center" alignItems="center" gap={0.5}>
              <IconButton
                onClick={() => displayedVersion && vote(displayedVersion, 'up')}
                size="small"
              >
                <SvgIcon htmlColor={getIconColor('up')}>
                  <LikeIcon />
                </SvgIcon>
              </IconButton>
              <Typography color={getIconColor('up')}>{displayedVersion?.upvotes}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="center" alignItems="center" gap={0.5}>
              <IconButton
                onClick={() => displayedVersion && vote(displayedVersion, 'down')}
                size="small"
              >
                <SvgIcon htmlColor={getIconColor('down')}>
                  <DislikeIcon />
                </SvgIcon>
              </IconButton>
              <Typography color={getIconColor('down')}>{displayedVersion?.downvotes}</Typography>
            </Stack>
            <Stack direction="row" width="100%" alignItems="center">
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
        </CardContent>
      </Card>
      <Dialog
        openDialogState={isDialogOpen}
        title={dialogTitle}
        content={dialogContent}
        cancelFunction={handleCloseDialog}
        finishFunction={dialogFinishFN}
        cancelBtnText={t(StringBank.CANCEL)}
        finishBtnText={t(StringBank.DELETE)}
        doneBtnVariant="delete"
      />
      <Snackbar
        open={isSnackbarVisible}
        message={t(StringBank.URL_COPIED_SUCCESSFULLY)}
        onClose={() => setIsSnackbarVisible(false)}
      />
    </>
  );
};

export default DisplaySection;
