import { useTranslation } from 'react-i18next';
import { StringBank } from '../strings';
import { FC } from 'react';
import { useState, useContext } from 'react';
import { Button, Stack, Container, SvgIcon, Tooltip } from '@mui/material';
import { GroupContext } from 'contexts/group';
import { Chapter, LocalChapter, Section, Version } from 'types';
import {
  AgreementContent,
  AgreementCreatedSuccessfully,
  AgreementRules,
  NameAndRationale,
} from 'components/NewAgreement';
import { ReactComponent as DocLogo } from 'assets/icons/document.svg';
import { Appbar } from 'components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as XLogo } from 'assets/icons/x-circle.svg';
import { textSecondaryColor } from 'theme';
import { AgreementContext } from 'contexts';
import { isJsonContentEmpty } from 'utils/functions';

function initChapters(): LocalChapter[] {
  const existingChapters = localStorage.getItem('chapters');
  if (existingChapters) {
    return JSON.parse(existingChapters);
  }
  return [{ name: '', sections: [{}] }];
}

const NewAgreement: FC = () => {
  const { t } = useTranslation();
  const { vote } = useContext(AgreementContext);
  const { addAgreement, addAgreementError, addAgreementLoading } = useContext(GroupContext);
  const [agreementName, setAgreementName] = useState<string>(
    localStorage.getItem('agreementName') || ''
  );
  const [createdAgreementId, setCreatedAgreementId] = useState<number>();
  const [step, setStep] = useState(Number(localStorage.getItem('step')) || 1);
  const [categoryId, setCategoryId] = useState<number | null>(
    Number(localStorage.getItem('categoryId')) || null
  );
  const [chapters, setChapters] = useState<LocalChapter[]>(initChapters());
  const [rationale, setRationale] = useState(localStorage.getItem('rationale') || '');
  const [isAdminApprovalRequired, setIsAdminApprovalRequired] = useState(false);
  const navigate = useNavigate();

  addEventListener('unload', () => {
    if (step > 2) {
      clearAgreementLocally();
      return;
    }
    saveAgreementLocally();
  });

  function clearAgreementLocally() {
    localStorage.removeItem('agreementName');
    localStorage.removeItem('rationale');
    localStorage.removeItem('categoryId');
    localStorage.removeItem('chapters');
    localStorage.removeItem('step');
  }

  function getContinueTooltipTitle() {
    if (isContinueEnabled()) {
      return '';
    }
    if (step === 1) {
      return t(StringBank.AGREEMENT_NAME_AND_RATIONALE_REQUIRED);
    } else if (step === 2) {
      return t(StringBank.AT_LEAST_ONE_SECTION_REQUIRED);
    }
    return '';
  }

  function saveAgreementLocally() {
    localStorage.setItem('agreementName', agreementName);
    localStorage.setItem('categoryId', String(categoryId));
    localStorage.setItem('rationale', rationale);
    localStorage.setItem('chapters', JSON.stringify(chapters));
    localStorage.setItem('step', String(step));
  }

  function isContinueEnabled(): boolean {
    if (!agreementName || !rationale || addAgreementLoading || addAgreementError) {
      return false;
    }
    if (
      step === 2 &&
      chapters?.every(
        (chapter) =>
          chapter.name === '' ||
          chapter.sections.every((section) => isJsonContentEmpty(section.content))
      )
    ) {
      return false;
    }
    return true;
  }

  async function handleContinueClick() {
    if (step === 3) {
      const agreement = await addAgreement(categoryId, agreementName, rationale, chapters);
      setCreatedAgreementId(agreement?.id);
      const responseChapters = agreement?.chapters;
      const responseSections = responseChapters?.flatMap((chapter: Chapter) => chapter.sections);
      const responseVersions =
        responseSections?.flatMap((section: Section) => section.versions) ?? [];
      await Promise.all(
        responseVersions.map(async (version: Version) => await vote(version, 'up'))
      );
      clearAgreementLocally();
    }
    setStep(step + 1);
  }

  if (step === 4 && createdAgreementId) {
    return <AgreementCreatedSuccessfully agreementId={createdAgreementId} />;
  }

  const steps = [t(StringBank.RATIONALE), t(StringBank.SECTIONS), t(StringBank.RULES)];
  const stepsProps = { steps, activeStep: step };

  const breadcrumsProps = [
    {
      name: agreementName || 'My New Agreement',
      icon: DocLogo,
    },
  ];
  const actionsProps = [
    {
      icon: (
        <SvgIcon htmlColor={textSecondaryColor}>
          <XLogo />
        </SvgIcon>
      ),
      onClick: () => navigate(-1),
    },
  ];

  return (
    <>
      <Appbar stepper={stepsProps} breadcrumbs={breadcrumsProps} actions={actionsProps} />
      <Container maxWidth="md">
        <Stack justifyContent="center" gap={5} marginY={4}>
          {step < 3 && (
            <NameAndRationale
              name={agreementName}
              onNameChange={setAgreementName}
              rationale={rationale}
              onRationaleChange={setRationale}
              categoryId={categoryId}
              onCategoryChange={setCategoryId}
            />
          )}
          {step === 2 && <AgreementContent chapters={chapters} setChapters={setChapters} />}
          {step === 3 && (
            <AgreementRules
              isAdminApprovalRequired={isAdminApprovalRequired}
              setIsAdminApprovalRequired={setIsAdminApprovalRequired}
            />
          )}
          <Stack flexDirection="row-reverse" alignItems="center" justifyContent="space-between">
            <Tooltip title={getContinueTooltipTitle()} arrow placement="top">
              <span>
                <Button
                  variant="contained"
                  onClick={handleContinueClick}
                  disabled={!isContinueEnabled()}
                  color={step === 3 ? 'primary' : 'secondary'}
                >
                  {step === 3 ? t(StringBank.PUBLISH_AGREEMENT) : t(StringBank.CONTINUE)}
                </Button>
              </span>
            </Tooltip>
            {step == 3 && (
              <Button variant="text" onClick={() => setStep(step - 1)}>
                {t(StringBank.BACK)}
              </Button>
            )}
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default NewAgreement;
