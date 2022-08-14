import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { StringBank } from '../strings';
import { FC } from 'react';
import { useState, useContext } from 'react';
import { Button, Stack, Container } from '@mui/material';
import { GroupContext } from 'contexts/group';
import { addAgreement as addAgreementMutation, addCategoryMutation } from 'utils/mutations';
import { LocalChapter } from 'types';
import { AgreementContent, NameAndRationale } from 'components/NewAgreement';
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
  const [step, setStep] = useState(Number(localStorage.getItem('step')) || 0);
  const [categoryId, setCategoryId] = useState<number | null>(
    Number(localStorage.getItem('categoryId')) || null
  );
  const [chapters, setChapters] = useState<LocalChapter[]>(initChapters());
  const [rationale, setRationale] = useState(localStorage.getItem('rationale') || '');

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

  function handleContinueClick() {
    if (step === 3) {
      return addAgreement({
        variables: {
          category_id: categoryId,
          group_id: groupId,
          name: agreementName,
          rationale: rationale,
        },
      });
    }
    setStep(step + 1);
  }

  const [openDialogState, setOpenDialogState] = useState(false);
  const [createCategoryMutationFN, { error: newCatError }] = useMutation(addCategoryMutation, {
    refetchQueries: ['categories'],
  });

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
      <Stack justifyContent="center" spacing={5} sx={{ marginTop: '1em' }}>
        <NameAndRationale
          name={agreementName}
          onNameChange={setAgreementName}
          rationale={rationale}
          onRationaleChange={setRationale}
          categoryId={categoryId}
          onCategoryChange={setCategoryId}
        />
        {step === 2 && <AgreementContent chapters={chapters} setChapters={setChapters} />}
        <Stack flexDirection="row-reverse" alignItems="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleContinueClick}
            disabled={!isContinueEnabled}
          >
            {t(StringBank.CONTINUE)}
          </Button>
        </Stack>
      </Stack>
      <h1>Add new Category</h1>
      <Button onClick={handleClickOpenDialog}>Add New Category</Button>
      <DialogEl
        openDialogState={openDialogState}
        title="New Category"
        content=""
        closeFunction={handleCloseDialog}
        createFunction={onCreateCategory}
        closeBtnText="Close"
        doneBtnText="Create"
      ></DialogEl>
    </Container>
  );
};

export default NewAgreement;
