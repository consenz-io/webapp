import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { FC, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StringBank } from 'strings';
import { generateColorFromString, truncateAfterWords } from 'utils/functions';
import DropDownMenu from './DropDownMenu';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { GroupContext } from 'contexts/group';
import { ColorModeAndDirectionContext } from 'theme';
import { ThemeModeType } from 'types';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DialogEl from '../components/Dialog';

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
  const { archiveAgreement, slug, deleteAgreement } = useContext(GroupContext);
  const navigate = useNavigate();
  const cardBackgroundColor = mode === ThemeModeType.LIGHT ? '#E3E3E3' : '#595F68';

  // delete action
  const [openDialogState, setOpenDialogState] = useState(false);
  const handleClickOpenDialog = () => {
    setOpenDialogState(true);
  };
  const handleCloseDialog = () => {
    setOpenDialogState(false);
  };
  const onDeleteAgreement = (name: string) => {
    deleteAgreement(name);
    setOpenDialogState(false);
  };

  return (
    <>
      <MainCard onClick={() => navigate(`/${slug}/agreement/${id}`)}>
        <Stack>
          <CardContent sx={{ backgroundColor: cardBackgroundColor, position: 'relative' }}>
            <Box position="absolute" left="1rem" right="1rem">
              {category && (
                <Chip
                  sx={{ background: generateColorFromString(category || '', true), color: 'white' }}
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
                  menuItems={[
                    {
                      text: t(isArchived ? StringBank.UNARCHIVE : StringBank.ARCHIVE),
                      icon: <Inventory2OutlinedIcon />,
                      action: () => archiveAgreement(id, !isArchived),
                    },
                    {
                      text: 'Delete',
                      icon: <DeleteOutlineIcon sx={{ color: '#FC6D8F' }} />,
                      action: () => {
                        handleClickOpenDialog();
                      },
                      textColor: '#FC6D8F',
                    },
                  ]}
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
        content="Please write the name of the agreement to delete it"
        closeFunction={handleCloseDialog}
        createFunction={onDeleteAgreement}
        closeBtnText="Cancle"
        doneBtnText="Delete"
        placeHolderText={t(StringBank.AGREEMENT_NAME_FIELD)}
      ></DialogEl>
    </>
  );
};

export default AgreementCard;
