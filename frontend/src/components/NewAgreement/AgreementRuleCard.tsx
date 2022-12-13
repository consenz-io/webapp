import { Box, Button, Card, Stack, Switch, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { StringBank } from 'strings';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface IProps {
  type: 'boolean' | 'dropdown' | 'soon';
  title: string;
  description: string;
  isEnabled?: boolean;
  onChange?: (value: boolean) => void;
}

const AgreementRuleCard: FC<IProps> = ({ type, title, description, isEnabled, onChange }) => {
  const { t } = useTranslation();
  return (
    <Card variant="elevation" elevation={0}>
      <Box padding={3}>
        <Stack direction="row" justifyContent="space-between">
          <Stack gap={2}>
            <Stack direction="row" gap={2} alignItems="center">
              {type === 'boolean' && (
                <Switch checked={isEnabled} onChange={(e, c) => onChange?.(c)} />
              )}
              <Typography variant="h4">{title}</Typography>
            </Stack>
            <Typography variant="body1">{description}</Typography>
          </Stack>
          <Stack justifyContent="center">
            {type === 'dropdown' && (
              <Button disabled variant="contained" size="large" endIcon={<KeyboardArrowDownIcon />}>
                <Typography variant="body1">Unlimited</Typography>
                <Box paddingX={4} />
              </Button>
            )}
            {type === 'soon' && (
              <Typography variant="body2" color="text.secondary">
                {t(StringBank.COMING_SOON)}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
};

export default AgreementRuleCard;
