import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { StringBank } from '../strings';
import React, { FC } from 'react';
import { useState, useContext } from 'react';
import { CategorySelect } from '../components';
import { Button, Stack, Typography, InputBase, Container, Divider, useTheme } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { GroupContext } from 'contexts/group';
import { addAgreement as addAgreementMutation } from 'utils/mutations';
import styled from 'styled-components';
import { IChapter, ISection } from 'types';

const Span = styled.span`
  ${(props) => props.theme.typography.h2};
  min-width: ${(props) => props.placeholder?.length}ch;
  outline: none;
  &:empty:before {
    content: attr(placeholder);
    color: ${(props) => props.theme.palette.background.border};
  }
`;

type LocalChapter = Pick<IChapter, 'name'> & {
  sections: Pick<ISection, 'content'>[];
};
const createNewChapter = (): LocalChapter => ({
  name: '',
  sections: [{ content: '' }],
});

const NewAgreement: FC = () => {
  const { t } = useTranslation();
  const { id } = useContext(GroupContext);
  const [agreementName, setAgreementName] = useState<string>('');
  const [step, setStep] = useState(1);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [chapters, setChapters] = useState<LocalChapter[]>([createNewChapter()]);
  const [rationale, setRationale] = useState(''); //@todo default to value in extant record if one exists
  const groupId = id;
  const theme = useTheme();

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
  const handleContinueClick = () => {
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
  };
  const handleChapterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') {
      return;
    }
    setChapters([...chapters, createNewChapter()]);
  };

  return (
    <Container maxWidth="md">
      <Stack justifyContent="center" spacing={5} sx={{ marginTop: '1em' }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Span
            onBlur={(e) => setAgreementName(e.target.textContent || '')}
            contentEditable
            suppressContentEditableWarning
            placeholder={t(StringBank.AGREEMENT_NAME_FIELD)}
          >
            {agreementName}
          </Span>
          <EditOutlinedIcon htmlColor="#B9BBBE" />
          {!!groupId && (
            <CategorySelect
              categoryId={categoryId}
              onChange={(newCategoryId) => setCategoryId(newCategoryId)}
            />
          )}
        </Stack>
        <Stack spacing={1}>
          <Typography variant="h3">{t(StringBank.ADD_RATIONALE_HEADER)}</Typography>
          <InputBase
            value={rationale}
            placeholder={t(StringBank.ADD_RATIONALE_PARAGRAPH)}
            onChange={(event) => setRationale(event.target.value)}
            multiline
          />
        </Stack>
        {step === 2 && (
          <Stack justifyContent="center" spacing={1}>
            <Divider />
            {chapters.map((chapter, i) => (
              <Stack key={i}>
                <InputBase
                  sx={{ ...theme.typography.h3 }}
                  placeholder={t(StringBank.NEW_CHAPTER)}
                  startAdornment={<Typography variant="h3">#&nbsp;</Typography>}
                  onChange={(e) => (chapter.name = e.target.value) && setChapters([...chapters])}
                  value={chapter.name}
                  onKeyDown={handleChapterKeyDown}
                />
                {chapter.sections?.map((section, j) => (
                  <InputBase
                    key={j}
                    placeholder={t(StringBank.INSERT_NEW_SECTION)}
                    multiline
                    onChange={(e) =>
                      (section.content = e.target.value) && setChapters([...chapters])
                    }
                    value={section.content}
                  />
                ))}
              </Stack>
            ))}
          </Stack>
        )}
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
