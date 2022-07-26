import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { StringBank } from 'strings';
import { generateColorFromString, truncateAfterWords } from 'utils/functions';
import DropDownMenu from './DropDownMenu';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { GroupContext } from 'contexts/group';

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
  const { archiveAgreement } = useContext(GroupContext);
  console.info(updatedAt);
  return (
    <Card>
      <Stack>
        <CardContent sx={{ backgroundColor: '#595F68', position: 'relative' }}>
          <Box position="absolute" left="1rem">
            {category && (
              <Chip
                sx={{ background: generateColorFromString(category || '', true) }}
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
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              paddingBottom={1}
            >
              <Typography fontWeight="bold" variant="body1">
                {title}
              </Typography>
              <DropDownMenu
                mainIcon={<MoreHorizIcon />}
                name="agreement-menu"
                menuItems={[
                  {
                    text: t(isArchived ? StringBank.UNARCHIVE : StringBank.ARCHIVE),
                    icon: <Inventory2OutlinedIcon />,
                    action: () => archiveAgreement(id, !isArchived),
                  },
                ]}
              />
            </Stack>
            <Typography variant="caption">
              {t(StringBank.AGREEMENT_PARTICIPANTS, { count: participants })}
            </Typography>
            {rationale && (
              <Typography variant="body2" marginY={1}>
                {truncateAfterWords(rationale, 10)}
              </Typography>
            )}
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
    </Card>
  );
};

export default AgreementCard;
