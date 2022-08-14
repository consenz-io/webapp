import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { StringBank } from '../strings';
import { FC } from 'react';
import { useState, useContext } from 'react';
import { Button, Stack, Container } from '@mui/material';
import { GroupContext } from 'contexts/group';
import { addAgreement as addAgreementMutation, addCategoryMutation } from 'utils/mutations';
import { LocalChapter } from 'types';
import {
  AgreementContent,
  AgreementCreatedSuccessfully,
  AgreementRules,
  NameAndRationale,
} from 'components/NewAgreement';
import DialogEl from '../components/Dialog';

function initChapters(): LocalChapter[] {
  const existingChapters = localStorage.getItem('chapters');
  if (existingChapters) {
    return JSON.parse(existingChapters);
  }
  return [{ name: '', sections: [{ content: '' }] }];
}

const NewAgreement: FC = () => {
  const { t } = useTranslation();
  const { id: groupId } = useContext(GroupContext);
  const [agreementName, setAgreementName] = useState<string>(
    localStorage.getItem('agreementName') || ''
  );
  const [openDialogState, setOpenDialogState] = useState(false);
  const [createCategoryMutationFN, { error: newCatError }] = useMutation(addCategoryMutation);
  const [step, setStep] = useState(Number(localStorage.getItem('step')) || 1);
  const [categoryId, setCategoryId] = useState<number | null>(
    Number(localStorage.getItem('categoryId')) || null
  );
  const [chapters, setChapters] = useState<LocalChapter[]>(initChapters());
  const [rationale, setRationale] = useState(localStorage.getItem('rationale') || '');
  const [isAdminApprovalRequired, setIsAdminApprovalRequired] = useState(false);

  addEventListener('unload', () => {
    localStorage.setItem('agreementName', agreementName);
    localStorage.setItem('categoryId', String(categoryId));
    localStorage.setItem('rationale', rationale);
    localStorage.setItem('chapters', JSON.stringify(chapters));
    localStorage.setItem('step', String(step));
  });

  const [
    addAgreement,
    { data: addAgreementData, loading: addAgreementLoading, error: addAgreementError },
  ] = useMutation(addAgreementMutation, { refetchQueries: ['agreements'] });

  const isContinueEnabled =
    agreementName &&
    rationale &&
    !addAgreementLoading &&
    !addAgreementError &&
    addAgreementData === undefined;

  async function handleContinueClick() {
    if (step === 3) {
      await addAgreement({
        variables: {
          category_id: categoryId,
          group_id: groupId,
          name: agreementName,
          rationale: rationale,
        },
      });
      localStorage.removeItem('agreementName');
      localStorage.removeItem('rationale');
      localStorage.removeItem('categoryId');
      localStorage.removeItem('chapters');
      localStorage.removeItem('step');
    }
    setStep(step + 1);
  }

  if (step === 4) {
    return <AgreementCreatedSuccessfully />;
  }

  const handleClickOpenDialog = () => {
    setOpenDialogState(true);
  };
  const handleCloseDialog = () => {
    setOpenDialogState(false);
  };

  const onCreateCategory = (val: string) => {
    createCategoryMutationFN({ variables: { name: val, group_id: groupId } });
    if (newCatError) {
      console.log('err in mutation create category', newCatError);
    }
    setOpenDialogState(false);
  };

  return (
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
      <h1>Add new Category</h1>
      <Button onClick={handleClickOpenDialog}>Add New Category</Button>
      <DialogEl
        openDialogState={openDialogState}
        title="New Category"
        content="My New Category"
        closeFunction={handleCloseDialog}
        createFunction={onCreateCategory}
        closeBtnText="Close"
        doneBtnText="Create"
      ></DialogEl>
    </Container>
  );
};

export default NewAgreement;
