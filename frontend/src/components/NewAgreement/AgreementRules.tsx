import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { StringBank } from 'strings';
import AgreementRuleCard from './AgreementRuleCard';

const AgreementRules: FC<{
  isAdminApprovalRequired: boolean;
  setIsAdminApprovalRequired: (value: boolean) => void;
}> = ({ isAdminApprovalRequired, setIsAdminApprovalRequired }) => {
  const { t } = useTranslation();
  return (
    <Stack gap={5}>
      <Stack gap={2}>
        <Stack gap={1.5}>
          <Typography variant="h3">{t(StringBank.AGREEMENT_PROCESS_RULES)}</Typography>
          <Typography variant="caption">
            {t(StringBank.AGREEMENT_PROCESS_RULES_DESCRIPTION)}
          </Typography>
        </Stack>
        <AgreementRuleCard
          type="dropdown"
          title={t(StringBank.TIME_LIMITED)}
          description={t(StringBank.TIME_LIMITED_DESCRIPTION)}
        />
        <AgreementRuleCard
          type="soon"
          isEnabled={isAdminApprovalRequired}
          onChange={setIsAdminApprovalRequired}
          title={t(StringBank.REQUIRE_ADMIN_APPROVAL)}
          description={t(StringBank.REQUIRE_ADMIN_APPROVAL_DESCRIPTION)}
        />
      </Stack>
      <Stack gap={2}>
        <Stack gap={1.5}>
          <Typography variant="h3">{t(StringBank.AGREEMENT_APPROVAL_RULES)}</Typography>
          <Typography variant="caption">
            {t(StringBank.AGREEMENT_APPROVAL_RULES_DESCRIPTION)}
          </Typography>
        </Stack>
        <AgreementRuleCard
          type="soon"
          title={t(StringBank.REQUIRED_QUORUM)}
          description={t(StringBank.REQUIRED_QUORUM_DESCRIPTION)}
        />
        <AgreementRuleCard
          type="soon"
          title={t(StringBank.MINIMAL_MAJORITY_FOR_APPROVAL)}
          description={t(StringBank.MINIMAL_MAJORITY_FOR_APPROVAL_DESCRIPTION)}
        />
      </Stack>
    </Stack>
  );
};

export default AgreementRules;
