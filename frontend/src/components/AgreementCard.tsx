import { Box, Card, CardContent, Chip, Stack, SvgIcon, Typography } from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { FC, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StringBank } from 'strings';
import { generateColorFromString, truncateAfterWords } from 'utils/functions';
import DropDownMenu from './DropDownMenu';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { GroupContext } from 'contexts/group';
import { backgroundBorderColor, ColorModeAndDirectionContext } from 'theme';
import { MenuItem, ThemeModeType, VariantType } from 'types';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DialogEl from '../components/Dialog';
import { ReactComponent as TrashIcon } from 'assets/icons/trash-2.svg';
import { AuthContext } from 'contexts';

interface IAgreementCardProps {
  id: number;
  category?: string;
  rationale?: string;
  title: string;
  updatedAt: Date;
  participants: number;
  isArchived?: boolean;
}

const MainCard = styled(Card)`
  cursor: pointer;
  transition: all 0.2s linear;
  &:hover {
    box-shadow: 0px 0px 8px ${(props) => props.theme.palette.background.border};
  }
`;

const TrashIconWrapper = styled(SvgIcon)`
  svg path {
    fill: #fc6d8f;
  }
`;

const TrashEL = () => {
  return (
    <TrashIconWrapper>
      <TrashIcon />
    </TrashIconWrapper>
  );
};

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
  const { mode } = useContext(ColorModeAndDirectionContext);
  const { role } = useContext(AuthContext);
  const { archiveAgreement, slug, deleteAgreement } = useContext(GroupContext);
  const navigate = useNavigate();
  const cardBackgroundColor = mode === ThemeModeType.LIGHT ? '#E3E3E3' : backgroundBorderColor;

  const baseDelDialogContent = `Please write the name of the agreement: ${title} - to delete it.`;
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
        text: t(isArchived ? StringBank.UNARCHIVE : StringBank.ARCHIVE),
        icon: <Inventory2OutlinedIcon />,
        action: () => archiveAgreement(id, !isArchived),
      },
    ];
    if (role && role === 'moderator') {
      menuItems.push({
        text: 'Delete',
        icon: <TrashEL />,
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
      <MainCard onClick={() => navigate(`/${slug}/agreement/${id}`)}>
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
              <Typography variant="body2" marginY={1} height="4.3em">
                {truncateAfterWords(rationale ?? ' ', 12)}
              </Typography>
              <Typography variant="caption">
                {t(StringBank.AGREEMENT_UPDATED_AT, {
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
      </MainCard>
      <DialogEl
        openDialogState={openDialogState}
        title="Delete Agreement"
        content={currentContent}
        cancelFunction={handleCloseDialog}
        finishFunction={onDeleteAgreement}
        cancelBtnText="cancel"
        finishBtnText="Delete"
        placeHolderText={t(StringBank.AGREEMENT_NAME_FIELD)}
        doneBtnVariant="delete"
      ></DialogEl>
    </>
  );
};

export default AgreementCard;
