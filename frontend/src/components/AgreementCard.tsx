import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { IAgreementCardProps } from 'types';
import ArticleIcon from '@mui/icons-material/Article';
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
            {category ? <Chip color="primary" label={category} /> : <Box />}
            <ArticleIcon sx={{ fontSize: 52 }} />
            <Box />
          </Stack>
        </CardContent>
        <CardContent>
          <Stack>
            <Typography fontWeight="bold" variant="body1">
              {title}
            </Typography>
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
