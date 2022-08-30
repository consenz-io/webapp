import { Divider, InputBase, Stack, Typography, useTheme } from '@mui/material';
import { JSONContent } from '@tiptap/react';
import { ContentEditor } from 'components';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { StringBank } from 'strings';
import { LocalChapter } from 'types';
import { isJsonContentEmpty } from 'utils/functions';

interface IProps {
  chapters: LocalChapter[];
  setChapters: (chapters: LocalChapter[]) => void;
}

function createNewChapter(): LocalChapter {
  return {
    name: '',
    sections: [{}],
  };
}

const AgreementContent: FC<IProps> = ({ chapters, setChapters }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const allNonEmptySections = chapters
    .flatMap((chapter) => chapter.sections)
    .filter((section) => !isJsonContentEmpty(section.content));

  function handleChapterChange(index: number, value: string) {
    const newChapters = [...chapters];
    newChapters[index].name = value;
    if (index === chapters.length - 1 && value) {
      newChapters.push(createNewChapter());
    }
    setChapters(newChapters);
  }
  function handleSectionChange(chapterIndex: number, sectionIndex: number, value: JSONContent) {
    chapters[chapterIndex].sections[sectionIndex].content = value;
    if (sectionIndex === chapters[chapterIndex].sections.length - 1 && !isJsonContentEmpty(value)) {
      chapters[chapterIndex].sections.push({});
    }
    setChapters([...chapters]);
  }

  function handleChapterKeyDown(
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) {
    if (
      event.key === 'Tab' &&
      index !== chapters.length - 1 &&
      chapters[index].sections.every((s) => isJsonContentEmpty(s.content)) &&
      !chapters[index].name
    ) {
      chapters.splice(index, 1);
      setChapters([...chapters]);
    }
  }

  function handleSectionKeyDown(
    event: React.KeyboardEvent,
    chapterIndex: number,
    sectionIndex: number
  ) {
    const sectionsInChapter = chapters[chapterIndex].sections;
    if (
      sectionIndex !== sectionsInChapter.length - 1 &&
      event.key === 'Tab' &&
      isJsonContentEmpty(sectionsInChapter[sectionIndex].content)
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
          }"] [contentEditable]`
        ) as HTMLTextAreaElement
      )?.focus();
    }
  }
  return (
    <Stack justifyContent="center" spacing={1}>
      <Divider />
      {chapters.map((chapter, i) => (
        <Stack key={i}>
          <InputBase
            sx={theme.typography.h3}
            placeholder={t(StringBank.NEW_CHAPTER)}
            startAdornment={
              <Typography variant="h3" color={chapter.name ? 'text.primary' : 'text.secondary'}>
                #&nbsp;
              </Typography>
            }
            onChange={(e) => handleChapterChange(i, e.target.value)}
            value={chapter.name}
            onKeyDown={(e) => handleChapterKeyDown(e, i)}
          />
          {chapter.sections?.map((section, j) => (
            <Stack key={j}>
              {allNonEmptySections.indexOf(section) !== -1 && (
                <Typography variant="h6" fontWeight="normal" color="text.secondary">
                  Section {allNonEmptySections.indexOf(section) + 1}
                </Typography>
              )}
              <ContentEditor
                placeholder={t(StringBank.INSERT_NEW_SECTION)}
                initialContent={section.content}
                data-chapter-index={i}
                data-section-index={j}
                onChange={(value) => handleSectionChange(i, j, value)}
                onKeyDown={(event) => handleSectionKeyDown(event, i, j)}
              />
            </Stack>
          ))}
        </Stack>
      ))}
    </Stack>
  );
};

export default AgreementContent;
