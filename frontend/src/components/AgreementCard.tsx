import { Box, CardContent, Chip, Stack, Typography } from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { FC, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StringBank } from 'strings';
import { generateColorFromString, truncateAfterWords } from 'utils/functions';
import DropDownMenu from './DropDownMenu';
import { GroupContext } from 'contexts/group';
import { backgroundBorderColor } from 'theme';
import { MenuItem, ThemeModeType, VariantType } from 'types';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as TrashIcon } from 'assets/icons/trash-2.svg';
import { ReactComponent as EyeIcon } from 'assets/icons/eye.svg';
import { ReactComponent as ArchiveIcon } from 'assets/icons/archive.svg';
import { AuthContext, SettingsContext } from 'contexts';
import { ClickableCard, SvgIcon, Dialog } from '.';
import { Role } from 'types/entities';

interface IAgreementCardProps {
  id: number;
  category?: string;
  rationale?: string;
  title: string;
  updatedAt: Date;
  participants: number;
  isArchived?: boolean;
}

const AgreementCard: FC<IAgreementCardProps> = ({
  id,
  category,
  rationale = '',
  title,
  updatedAt,
  participants,
  isArchived,
}) => {
  const { t } = useTranslation();
  const { colorMode } = useContext(SettingsContext);
  const { role, jwt, loginWithRedirect } = useContext(AuthContext);
  const { archiveAgreement, slug, deleteAgreement, id: groupId } = useContext(GroupContext);
  const navigate = useNavigate();
  const cardBackgroundColor = colorMode === ThemeModeType.LIGHT ? '#E3E3E3' : backgroundBorderColor;

  const baseDelDialogContent = t(StringBank.DELETE_AGREEMENT_DESCRIPTION, {
    title,
  });
  const [currentContent, setDelPopContent] = useState<string>(baseDelDialogContent);
  const [openDialogState, setOpenDialogState] = useState(false);
  const handleClickOpenDialog = () => {
    setOpenDialogState(true);
  };
  const handleCloseDialog = () => {
    setOpenDialogState(false);
  };
  const onDeleteAgreement = (name: string) => {
    if (name !== title) {
      setDelPopContent(
        `${currentContent}\nThe inputed name: ${name}does not match the agreement name: ${title}`
      );
      setTimeout(() => {
        setDelPopContent(baseDelDialogContent);
      }, 4000);
    } else {
      deleteAgreement(id);
      setOpenDialogState(false);
    }
  };

  function getMenuItems() {
    const menuItems: MenuItem[] = [
      {
        icon: <EyeIcon />,
        text: t(StringBank.VIEW_DRAFT),
        action: () => navigate(`/${slug}/agreement/${id}/draft`),
      },
      {
        text: t(isArchived ? StringBank.UNARCHIVE : StringBank.ARCHIVE),
        icon: <ArchiveIcon />,
        action: () => {
          if (!jwt) {
            return loginWithRedirect({
              redirectTo: window.location.pathname,
              joinGroupId: groupId,
            });
          }
          archiveAgreement(id, !isArchived);
        },
      },
    ];
    if (role === Role.MODERATOR) {
      menuItems.push({
        text: t(StringBank.DELETE),
        icon: (
          <SvgIcon htmlColor="#fc6d8f">
            <TrashIcon />
          </SvgIcon>
        ),
        action: () => {
          handleClickOpenDialog();
        },
        textColor: '#FC6D8F',
      });
    }
    return menuItems;
  }

  return (
    <>
      <ClickableCard onClick={() => navigate(`/${slug}/agreement/${id}`)}>
        <Stack>
          <CardContent sx={{ backgroundColor: cardBackgroundColor, position: 'relative' }}>
            <Box position="absolute" left="1rem" right="1rem">
              {category && (
                <Chip
                  sx={{
                    background: generateColorFromString(category || '', true),
                    color: 'white',
                  }}
                  label={category}
                />
              )}
            </Box>
            <Stack flexDirection="row" justifyContent="center" paddingY={2}>
              <DescriptionOutlinedIcon sx={{ fontSize: 52 }} color="disabled" />
            </Stack>
          </CardContent>
          <CardContent>
            <Stack>
              <Stack
                flexDirection="row-reverse"
                justifyContent="space-between"
                alignItems="center"
                paddingBottom={1}
              >
                <DropDownMenu
                  mainIcon={<MoreHorizIcon />}
                  name="agreement-menu"
                  styleVariant={VariantType.PRIMARY}
                  menuItems={getMenuItems()}
                />
                <Typography
                  fontWeight="bold"
                  variant="body1"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  maxWidth="calc(100% - 40px)"
                >
                  {title}
                </Typography>
              </Stack>

              <Typography variant="caption">
                {t(StringBank.AGREEMENT_PARTICIPANTS, { count: participants })}
              </Typography>
              <Typography variant="body2" marginY={1} minHeight="4em">
                {truncateAfterWords(rationale ?? ' ', 12)}
              </Typography>
              <Typography variant="caption">
                {t(StringBank.AGREEMENT_UPDATED_AT, {
                  interpolation: { escapeValue: false },
                  date: updatedAt.toLocaleString(navigator.language, {
                    month: 'numeric',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  }),
                })}
              </Typography>
            </Stack>
          </CardContent>
        </Stack>
      </ClickableCard>
      <Dialog
        openDialogState={openDialogState}
        title={t(StringBank.DELETE_AGREEMENT)}
        content={currentContent}
        onClose={handleCloseDialog}
        onSubmit={onDeleteAgreement}
        cancelTitle={t(StringBank.CANCEL)}
        SubmitTitle={t(StringBank.DELETE)}
        textboxPlaceholder={t(StringBank.AGREEMENT_NAME_FIELD)}
        doneBtnVariant="delete"
        isTextBox
      />
    </>
  );
};

export default AgreementCard;
