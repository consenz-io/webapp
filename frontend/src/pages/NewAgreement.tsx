import { useTranslation } from 'react-i18next';
import { StringBank } from '../strings';
import { FC } from 'react';
import { useState, useContext } from 'react';
import { Button, Stack, Container } from '@mui/material';
import { GroupContext } from 'contexts/group';
import { LocalChapter } from 'types';
import {
  AgreementContent,
  AgreementCreatedSuccessfully,
  AgreementRules,
  NameAndRationale,
} from 'components/NewAgreement';
import { ReactComponent as DocLogo } from 'assets/icons/document.svg';
import { Appbar } from 'components';
import { useNavigate } from 'react-router-dom';

function initChapters(): LocalChapter[] {
  const existingChapters = localStorage.getItem('chapters');
  if (existingChapters) {
    return JSON.parse(existingChapters);
  }
  return [{ name: '', sections: [{}] }];
}

const NewAgreement: FC = () => {
  const { t } = useTranslation();
  const { addAgreement, addAgreementError, addAgreementLoading } = useContext(GroupContext);
  const [agreementName, setAgreementName] = useState<string>(
    localStorage.getItem('agreementName') || ''
  );
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

  function saveAgreementLocally() {
    localStorage.setItem('agreementName', agreementName);
    localStorage.setItem('categoryId', String(categoryId));
    localStorage.setItem('rationale', rationale);
    localStorage.setItem('chapters', JSON.stringify(chapters));
    localStorage.setItem('step', String(step));
  }

  const isContinueEnabled =
    agreementName && rationale && !addAgreementLoading && !addAgreementError;

  async function handleContinueClick() {
    if (step === 3) {
      await addAgreement(categoryId, agreementName, rationale, chapters);
      clearAgreementLocally();
    }
    setStep(step + 1);
  }

  if (step === 4) {
    return <AgreementCreatedSuccessfully />;
  }

  const steps = [t(StringBank.RATIONALE), t(StringBank.SECTIONS), t(StringBank.RULES)];
  const stepsProps = { steps, activeStep: step };

  const breadcrumsProps = [
    {
      name: agreementName || 'My New Agreement',
      icon: DocLogo,
    },
  ];

  return (
    <>
      <Appbar
        stepsSection={stepsProps}
        closeFn={() => navigate(-1)}
        breadcrumsSection={breadcrumsProps}
      />
      <Container maxWidth="md">
        <Stack justifyContent="center" spacing={5} marginY={4}>
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
            <Button
              variant="contained"
              onClick={handleContinueClick}
              disabled={!isContinueEnabled}
              color={step === 3 ? 'primary' : 'secondary'}
            >
              {step === 3 ? t(StringBank.PUBLISH_AGREEMENT) : t(StringBank.CONTINUE)}
            </Button>
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
