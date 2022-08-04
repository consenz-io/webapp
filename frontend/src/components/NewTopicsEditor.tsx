import { useMutation } from '@apollo/client';
import {
  addTopicMutation,
  updateTopicMutation,
  deleteTopicMutation,
  addSectionMutation,
  deleteSectionMutation,
  addSuggestionMutation,
  updateSuggestionMutation,
} from 'utils/queries';
import { useTranslation } from 'react-i18next';
import { StringBank } from 'strings';
import { useTheme } from '@mui/material/styles';
import { INewTopicsEditorProps, INewTopicProps, INewSectionProps } from 'types';
import React, { useState, FC, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { InputBase, Typography } from '@mui/material';

/**
 * Styled list item
 */
const HashBulletListItem = styled.li`
  position: relative;
  &.ltr:before {
    content: '#';
    position: absolute;
    left: -1em;
    top: 0.25em;
  }
  &.rtl:before {
    content: '#';
    position: absolute;
    right: -1em;
    top: 0.25em;
  }
`;

const NewTopicsEditor: FC<INewTopicsEditorProps> = ({ agreementId, data }) => {
  // const { t } = useTranslation();
  const theme = useTheme();

  /**
   * Mutations
   */
  const [addTopic, { /* data, loading, */ error: addTopicError }] = useMutation(addTopicMutation, {
    refetchQueries: ['agreementTopicsSectionsSuggestions'],
  });
  if (addTopicError) console.log(addTopicError);
  const [updateTopic, { error: updateTopicError }] = useMutation(updateTopicMutation, {
    refetchQueries: ['agreementTopicsSectionsSuggestions'],
  });
  if (updateTopicError) console.log(updateTopicError);
  const [deleteTopic, { error: deleteTopicError }] = useMutation(deleteTopicMutation, {
    refetchQueries: ['agreementTopicsSectionsSuggestions'],
  });
  if (deleteTopicError) console.log(deleteTopicError);
  const [addSection, { error: addSectionError }] = useMutation(addSectionMutation);
  if (addSectionError) console.log(addSectionError);
  const [deleteSection, { error: deleteSectionError }] = useMutation(deleteSectionMutation, {
    refetchQueries: ['agreementTopicsSectionsSuggestions'],
  });
  if (deleteSectionError) console.log(deleteSectionError);
  const [addSuggestion, { error: addSuggestionError }] = useMutation(addSuggestionMutation, {
    refetchQueries: ['agreementTopicsSectionsSuggestions'],
  });
  if (addSuggestionError) console.log(addSuggestionError);
  const [updateSuggestion, { error: updateSuggestionError }] = useMutation(
    updateSuggestionMutation,
    { refetchQueries: ['agreementTopicsSectionsSuggestions'] }
  );
  if (updateSuggestionError) console.log(updateSuggestionError);

  /**
   * Handlers
   */
  const handleTopicInsert = (name: string) => {
    // Always insert new topic after any/all preceding. Use 1-base, not 0-base.
    const indexWithinAgreement = data.length + 1 || 1;
    addTopic({
      variables: { agreement_id: agreementId, index: indexWithinAgreement, name: name },
    });
  };
  const handleTopicChange = (topicId: number, name: string) => {
    // Update topic name by primary key.
    updateTopic({ variables: { id: topicId, name: name } });
  };
  const handleTopicDelete = (topicId: number, index: number) => {
    // Delete topic by primary key, and provide "index" from prior data.
    deleteTopic({ variables: { id: topicId, agreement_id: agreementId, index: index } });
  };
  const handleSectionInsert = (topicId: number, index: number, content: string) => {
    // Insert section at specified index in topic specified by key.
    addSection({
      variables: {
        agreement_id: agreementId,
        topic_id: topicId,
        index: index,
        content: content,
      },
    }).then((result) => {
      const sectionId = result.data.insert_core_sections_one.id;
      addSuggestion({ variables: { section_id: sectionId, content: content } });
    });
  };
  const handleSectionChange = (suggestionId: number, content: string) => {
    // Update section content by primary key.
    updateSuggestion({ variables: { id: suggestionId, content: content } });
  };
  const handleSectionDelete = (sectionId: number, index: number) => {
    // Delete section by primary key, and provide "index" from prior data.
    deleteSection({
      variables: { id: sectionId, agreement_id: agreementId as number, index: index },
    });
  };
  const handleSectionCreateNext = (topicId: number, index: number) => {
    console.log('@todo: insert new section? ', topicId, index);
  };

  /**
   * Compose
   */
  let sectionIndexWithinAgreement = 0;
  const composeTopicSections = (topic: {
    id: number;
    index: number;
    sections: Array<{ id: number; index: number }>;
  }) => {
    const elements = [];
    //@todo: Insert new section will have to go somewhere in here.
    for (let i = 0; i < topic.sections.length; i++) {
      const section = topic.sections[i];
      sectionIndexWithinAgreement = section.index;
      elements.push(
        <NewSection
          key={section.id}
          data={section}
          onInsert={handleSectionInsert}
          onChange={handleSectionChange}
          onDelete={handleSectionDelete}
          onCreateNext={handleSectionCreateNext}
        />
      );
    }
    return elements;
  };

  return (
    <ul
      className="new-topics-and-sections"
      style={{
        listStyle: 'none',
        marginLeft: 0,
        marginRight: 0,
        paddingLeft: theme.direction === 'ltr' ? '1em' : 'inherit',
        paddingRight: theme.direction === 'rtl' ? '1em' : 'inherit',
      }}
    >
      {data.map((topic) => (
        <HashBulletListItem key={topic.id} className={theme.direction} style={theme.typography.h3}>
          <NewTopic
            data={topic}
            onInsert={handleTopicInsert}
            onChange={handleTopicChange}
            onDelete={handleTopicDelete}
          >
            {composeTopicSections(
              /* First render the previously saved sections */
              topic as { id: number; index: number; sections: Array<{ id: number; index: number }> }
            )}
            {/* Then provide field for adding the next new section */}
            <NewSection
              key={Date.now()}
              data={{ index: sectionIndexWithinAgreement + 1, topic_id: topic?.id }}
              onInsert={handleSectionInsert}
              onChange={handleSectionChange}
              onDelete={handleSectionDelete}
              onCreateNext={handleSectionCreateNext}
            />
          </NewTopic>
        </HashBulletListItem>
      ))}
      {/* Always prompt for a new topic at the end. */}
      <HashBulletListItem key={Date.now()} className={theme.direction} style={theme.typography.h3}>
        <NewTopic
          data={{ index: data.length + 1, sections: [] }}
          onInsert={handleTopicInsert}
          onChange={handleTopicChange}
          onDelete={handleTopicDelete}
        />
      </HashBulletListItem>
    </ul>
  );
};

export default NewTopicsEditor;

/**
 * Topic editing UI
 */
const NewTopic: FC<PropsWithChildren<INewTopicProps>> = ({
  children,
  data,
  onInsert,
  onChange,
  onDelete,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  // State
  const [name, setName] = useState(data.name || '');
  const isFirst = data.index === 0;
  const isSaved = data.id !== undefined;
  const hasSectionContent = data.sections?.[0]?.id !== undefined;

  // Handlers
  const handleBlur = () => {
    if (isSaved) {
      if (name.length > 0) {
        onChange(data.id as number, name);
      } else if (!hasSectionContent) {
        onDelete(data.id as number, data.index as number);
      }
    } else if (name.length > 0) {
      onInsert(name);
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur();
    }
  };

  return (
    <div className="new-topic-editor">
      <InputBase
        value={name}
        placeholder={
          isSaved && !hasSectionContent
            ? t(StringBank.BLANK_TO_DELETE)
            : isFirst
            ? t(StringBank.NEW_TOPIC_PROMPT_FIRST)
            : t(StringBank.NEW_TOPIC_PROMPT)
        }
        onKeyDown={handleKeyDown}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
          setName(event.target.value)
        }
        onBlur={handleBlur}
        color="primary"
        sx={{ ...theme.typography.h3 }}
        multiline
        fullWidth
        autoComplete="off"
      />
      {children}
    </div>
  );
};

/**
 * Section editing UI
 */
const NewSection: FC<INewSectionProps> = ({ data, onInsert, onChange, onDelete, onCreateNext }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  // State
  const [content, setContent] = useState(data.suggestions?.[0]?.content || '');
  const [isFocused, setIsFocused] = useState(false);
  const sectionIndexPadded = String(data.index).padStart(2, '0');
  const isSaved = data.id !== undefined;

  // Handlers
  const handleBlur = () => {
    if (isSaved) {
      if (content.length == 0) {
        onDelete(data.id as number, data.index as number);
      } else if (content !== data.suggestions?.[0]?.content) {
        onChange(data.suggestions?.[0]?.id as number, content);
      }
    } else if (content.length > 0) {
      onInsert(data.topic_id as number, data.index as number, content);
    }
    setIsFocused(false);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.ctrlKey && event.key === 'Enter') {
      if (content.length > 0) {
        onCreateNext(data.topic_id as number, (data.index as number) + 1);
        event.currentTarget.blur();
      }
    }
  };

  return (
    <div className="new-section-editor" style={{ margin: '1em 0.6em' }}>
      {data.id !== undefined && <Typography variant="h6">Section {sectionIndexPadded}</Typography>}
      <InputBase
        value={content}
        placeholder={
          isSaved ? t(StringBank.BLANK_TO_DELETE) : `${t(StringBank.NEW_SECTION_INSERT)}...`
        }
        onKeyDown={handleKeyDown}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
          setContent(event.target.value)
        }
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        color="primary"
        sx={{ ...theme.typography.body1 }}
        multiline
        fullWidth
        autoComplete="off"
      />
      {isFocused && content?.length > 0 && !data.id && (
        <Typography
          variant="body2"
          sx={{ marginTop: '0.5em' }}
          onClick={() => onCreateNext(data.topic_id as number, data.index as number)}
        >
          + {t(StringBank.NEW_SECTION_INSERT)} (Ctrl/Cmd+Enter)
        </Typography>
      )}
    </div>
  );
};
