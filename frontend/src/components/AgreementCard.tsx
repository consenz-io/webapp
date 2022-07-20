import { Box, Card, CardContent, Chip, IconButton, Stack, Typography } from '@mui/material';
import { IAgreementCardProps } from 'types';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { StringBank } from 'strings';

const AgreementCard: FC<IAgreementCardProps> = ({ category, title, updatedAt, participants }) => {
  const { t } = useTranslation();
  return (
    <Card>
      <Stack>
        <CardContent sx={{ backgroundColor: '#595F68' }}>
          <Stack flexDirection="row" justifyContent="space-between">
            <Box flex={1}>{category && <Chip color="primary" label={category} />}</Box>
            <DescriptionOutlinedIcon sx={{ fontSize: 52, marginY: 1 }} />
            <Box flex={1} />
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
              <IconButton aria-label="menu" size="small">
                <MoreHorizIcon />
              </IconButton>
            </Stack>
            <Typography variant="caption">
              {t(StringBank.AGREEMENT_PARTICIPANTS, { count: participants })}
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
    </Card>
  );
};

export default AgreementCard;
