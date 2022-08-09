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
import { LocalChapter } from 'types';

const Span = styled.span`
  ${(props) => props.theme.typography.h2};
  min-width: ${(props) => props.placeholder?.length}ch;
  outline: none;
  &:empty:before {
    content: attr(placeholder);
    color: ${(props) => props.theme.palette.background.border};
  }
`;

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

  const allNonEmptySections = chapters
    .flatMap((chapter) => chapter.sections)
    .filter((section) => section.content);

  function handleChapterChange(index: number, value: string) {
    const newChapters = [...chapters];
    newChapters[index].name = value;
    if (index === chapters.length - 1 && value) {
      newChapters.push(createNewChapter());
    }
    setChapters(newChapters);
  }

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

  function handleSectionChange(chapterIndex: number, sectionIndex: number, value: string) {
    chapters[chapterIndex].sections[sectionIndex].content = value;
    if (sectionIndex === chapters[chapterIndex].sections.length - 1 && value) {
      chapters[chapterIndex].sections.push({ content: '' });
    }
    setChapters([...chapters]);
  }

  function handleSectionKeyDown(
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    chapterIndex: number,
    sectionIndex: number
  ) {
    const sectionsInChapter = chapters[chapterIndex].sections;
    if (
      sectionIndex !== sectionsInChapter.length - 1 &&
      event.key === 'Tab' &&
      !chapters[chapterIndex].sections[sectionIndex].content
    ) {
      sectionsInChapter.splice(sectionIndex, 1);
      setChapters([...chapters]);
      return;
    }
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      (
        document.querySelector(
          `[data-chapter-index="${chapterIndex}"][data-section-index="${
            sectionsInChapter.length - 1
          }"] textarea`
        ) as HTMLTextAreaElement
      )?.focus();
    }
  }

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
                  sx={theme.typography.h3}
                  placeholder={t(StringBank.NEW_CHAPTER)}
                  startAdornment={
                    <Typography
                      variant="h3"
                      color={chapter.name ? 'text.primary' : 'text.secondary'}
                    >
                      #&nbsp;
                    </Typography>
                  }
                  onChange={(e) => handleChapterChange(i, e.target.value)}
                  value={chapter.name}
                />
                {chapter.sections?.map((section, j) => (
                  <Stack key={j}>
                    {allNonEmptySections.indexOf(section) !== -1 && (
                      <Typography variant="h6" fontWeight="normal" color="text.secondary">
                        Section {allNonEmptySections.indexOf(section) + 1}
                      </Typography>
                    )}
                    <InputBase
                      placeholder={t(StringBank.INSERT_NEW_SECTION)}
                      data-chapter-index={i}
                      data-section-index={j}
                      multiline
                      rows={3}
                      onChange={(e) => handleSectionChange(i, j, e.target.value)}
                      onKeyDown={(e) => handleSectionKeyDown(e, i, j)}
                      value={section.content}
                    />
                  </Stack>
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
