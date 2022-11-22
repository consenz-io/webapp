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
import { SvgIcon } from 'components';
import { FC, useContext, useState } from 'react';
import { BtnCapital } from './DropDownMenu/style';
import { ReactComponent as LinkIcon } from 'assets/icons/link.svg';
import { ReactComponent as DislikeIcon } from 'assets/icons/dislike.svg';
import { ReactComponent as LikeIcon } from 'assets/icons/like.svg';
import { useTranslation } from 'react-i18next';
import ContentEditor from './ContentEditor';
import { Version } from 'types/entities';
import { textSecondaryColor } from 'theme';
import { ReactComponent as ArrowLogo } from 'assets/icons/chevron-down.svg';
import { getVoteColor, getRemainingSupporters, getVersionProgress } from 'utils/functions';
interface DisplayProns {
  displayedVersion: Version;
}
import { StringBank } from 'strings';
import { AgreementContext } from 'contexts';

const DisplaySection: FC<DisplayProns> = ({ displayedVersion }) => {
  const theme = useTheme();
  const { vote } = useContext(AgreementContext);
  const { t } = useTranslation();
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

  function getIconColor(voteType: 'up' | 'down'): string {
    return getVoteColor(theme, voteType, displayedVersion?.my_vote);
  }
  function handleShare() {
    navigator.clipboard.writeText(window.location.href);
    setIsSnackbarVisible(true);
  }

  return (
    <>
      <Card variant="elevation" elevation={0}>
        <CardContent sx={{ paddingX: 3 }}>
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={2}>
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
            <IconButton size="small" onClick={handleShare}>
              <SvgIcon htmlColor={textSecondaryColor}>
                <LinkIcon />
              </SvgIcon>
            </IconButton>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <IconButton sx={{ transform: 'rotate(180deg)' }}>
              <SvgIcon sx={{ margin: 'auto' }}>
                <ArrowLogo />
              </SvgIcon>
            </IconButton>
            <ContentEditor readonly content={displayedVersion?.content} />
            <IconButton>
              <SvgIcon>
                <ArrowLogo />
              </SvgIcon>
            </IconButton>
          </Stack>
          <Stack spacing={1} direction="row" alignItems="center">
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5}>
              <IconButton onClick={() => displayedVersion && vote(displayedVersion, 'up')}>
                <SvgIcon htmlColor={getIconColor('up')}>
                  <LikeIcon />
                </SvgIcon>
              </IconButton>
              <Typography color={getIconColor('up')}>{displayedVersion?.upvotes}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5}>
              <IconButton onClick={() => displayedVersion && vote(displayedVersion, 'down')}>
                <SvgIcon htmlColor={getIconColor('down')}>
                  <DislikeIcon />
                </SvgIcon>
              </IconButton>
              <Typography color={getIconColor('down')}>{displayedVersion?.downvotes}</Typography>
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
        </CardContent>
      </Card>
      <Snackbar
        open={isSnackbarVisible}
        message={t(StringBank.URL_COPIED_SUCCESSFULLY)}
        autoHideDuration={4000}
        onClose={() => setIsSnackbarVisible(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </>
  );
};

export default DisplaySection;
