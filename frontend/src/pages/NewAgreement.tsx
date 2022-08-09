import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { StringBank } from '../strings';
import { FC } from 'react';
import { useState, useContext } from 'react';
import { Button, Stack, Container } from '@mui/material';
import { GroupContext } from 'contexts/group';
import { addAgreement as addAgreementMutation } from 'utils/mutations';
import { LocalChapter } from 'types';
import { AgreementContent, NameAndRationale } from 'components/NewAgreement';

const NewAgreement: FC = () => {
  const { t } = useTranslation();
  const { id: groupId } = useContext(GroupContext);
  const [agreementName, setAgreementName] = useState<string>('');
  const [step, setStep] = useState(1);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [chapters, setChapters] = useState<LocalChapter[]>([
    {
      name: '',
      sections: [{ content: '' }],
    },
  ]);
  const [rationale, setRationale] = useState('');

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
          <Button variant="contained" onClick={handleContinueClick} disabled={!isContinueEnabled}>
            {t(StringBank.CONTINUE)}
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default NewAgreement;
