/* eslint-disable @typescript-eslint/no-empty-function */
import { Appbar, ContentEditor, SvgIcon, TextEditorPopup } from 'components';
import { AgreementContext, SectionContext } from 'contexts';
import { FC, useContext, useEffect, useState } from 'react';
import { ReactComponent as DocIcon } from 'assets/icons/document.svg';
import { ReactComponent as EyeIcon } from 'assets/icons/eye.svg';
import { ReactComponent as CheckCircleIcon } from 'assets/icons/check-circle.svg';
import { ReactComponent as LinkIcon } from 'assets/icons/link.svg';
import { ReactComponent as LikeIcon } from 'assets/icons/like.svg';
import { ReactComponent as DislikeIcon } from 'assets/icons/dislike.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  LinearProgress,
  Snackbar,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { StringBank } from 'strings';
import { BtnCapital } from 'components/DropDownMenu/style';
import { useTranslation } from 'react-i18next';
import { getVoteColor } from 'utils/functions';
import { useNavigate } from 'react-router-dom';
import { textSecondaryColor } from 'theme';
import { useMutation } from '@apollo/client';
import { addSectionVersion as insertSectionVersionMutation } from 'utils/mutations';
import { Section as SectionType } from 'types';

const Section: FC = () => {
  const theme = useTheme();
  const { section } = useContext(SectionContext);
  const { agreement, vote } = useContext(AgreementContext);
  const [displayedVersion, setDisplayedVersion] = useState(section?.versions[0]);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [isTextPopupeOpen, setisTextPopupeOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setDisplayedVersion(section?.versions[0]);
  }, [section]);
  const { t } = useTranslation();

  function handleShare() {
    navigator.clipboard.writeText(window.location.href);
    setIsSnackbarVisible(true);
  }

  function getIconColor(voteType: 'up' | 'down'): string {
    return getVoteColor(theme, voteType, displayedVersion?.my_vote);
  }

  function generateVersionName(section: SectionType | undefined): string {
    const versionNum = (section?.versions?.length ?? NaN) + 1;
    return `${t(StringBank.VERSION)} ${versionNum}`;
  }

  const [addVersion] = useMutation(insertSectionVersionMutation, { refetchQueries: ['section'] });
  const displayedVersionProgress = displayedVersion
    ? (100 * (displayedVersion.upvotes - displayedVersion.downvotes)) / displayedVersion.threshold
    : 0;

  return (
    <>
      <Appbar
        breadcrumbs={[
          {
            name: agreement?.name ?? '',
            link: '..',
            icon: DocIcon,
          },
          {
            name: `${t(StringBank.SECTION)} ${section?.index}`,
          },
        ]}
        actions={[
          {
            icon: <EyeIcon />,
            onClick: () => navigate('../draft'),
            title: t(StringBank.VIEW_DRAFT),
          },
        ]}
      />
      <Stack direction="row" spacing={1} marginY={2}>
        {section?.versions.map((version, i) => (
          <Chip
            deleteIcon={<CheckCircleIcon />}
            onDelete={version.id === section.current_version?.id ? () => {} : undefined}
            onClick={() => setDisplayedVersion(version)}
            label={`${t(StringBank.VERSION)} ${i + 1}`}
            key={version.id}
            color={displayedVersion === version ? 'primary' : 'default'}
          />
        ))}
        <Chip
          sx={{ '& .MuiChip-label': { paddingX: 0.5, display: 'flex' } }}
          onClick={() => {
            setisTextPopupeOpen(true);
          }}
          label={
            <SvgIcon htmlColor={textSecondaryColor} width="24px">
              <PlusIcon />
            </SvgIcon>
          }
        />
        <TextEditorPopup
          isOpen={isTextPopupeOpen}
          parentSection={`${t(StringBank.SECTION)} ${section?.index}`}
          newVersionName={generateVersionName(section)}
          onComplete={addVersion}
          onCancle={setisTextPopupeOpen}
          completeBtnText="Add version"
          cancleBtnText="Cancle"
          variabels={{ sectionId: section ? section.id : -1 }}
        />
      </Stack>
      <Card variant="elevation" elevation={0}>
        <CardContent sx={{ paddingX: 3 }}>
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={2}>
              <BtnCapital className="capital">{t(StringBank.ANONYMOUS)[0]}</BtnCapital>
              <Typography variant="h6">{t(StringBank.ANONYMOUS)}</Typography>
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
          <Box paddingY={4}>
            <ContentEditor
              readonly
              initialContent={displayedVersion?.content}
              key={`version${displayedVersion?.id}`}
            />
          </Box>
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
            <LinearProgress
              variant="determinate"
              value={displayedVersionProgress}
              sx={{ flexGrow: 1 }}
            />
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

export default Section;
