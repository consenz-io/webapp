import { InputBase, Stack, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { StringBank } from 'strings';
import styled from 'styled-components';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { DropDownMenu } from 'components';
import { GroupContext } from 'contexts/group';
import { useTranslation } from 'react-i18next';
import { VariantType } from 'types';
import Dialog from 'components/Dialog';
import { useMutation } from '@apollo/client';
import { addCategoryMutation } from 'utils/mutations';
import { generateColorFromString } from 'utils/functions';
import { JSONContent } from '@tiptap/react';

const Span = styled.span`
  ${(props) => props.theme.typography.h2};
  min-width: ${(props) => props.placeholder?.length}ch;
  outline: none;
  &:empty:before {
    content: attr(placeholder);
    color: ${(props) => props.theme.palette.background.border};
  }
`;

interface IProps {
  categoryId: number | null;
  name: string;
  onCategoryChange: (value: number | null) => void;
  onNameChange: (value: string) => void;
  onRationaleChange: (value: string) => void;
  rationale: JSONContent | string;
}

function NameAndRationale({
  categoryId,
  name,
  onCategoryChange,
  onNameChange,
  onRationaleChange,
  rationale,
}: IProps): JSX.Element {
  const [openDialogState, setOpenDialogState] = useState(false);
  const { id: groupId, categories } = useContext(GroupContext);

  const categoryName = categories.find((cat) => cat.id === categoryId)?.name;

  const { t } = useTranslation();
  const [createCategoryMutationFN, { error: newCatError }] = useMutation(addCategoryMutation, {
    refetchQueries: ['categories'],
  });

  async function onCreateCategory(val: string) {
    const cat = await createCategoryMutationFN({
      variables: { name: val, group_id: groupId },
    });
    if (newCatError) {
      console.error('err in mutation create category', newCatError);
    }
    onCategoryChange(cat.data.insert_core_categories_one.id);
    setOpenDialogState(false);
  }

  return (
    <>
      <Stack direction="row" gap={2} alignItems="center">
        <Span
          onBlur={(e) => onNameChange(e.target.textContent || '')}
          contentEditable
          suppressContentEditableWarning
          placeholder={t(StringBank.AGREEMENT_NAME_FIELD)}
        >
          {name}
        </Span>
        <EditOutlinedIcon htmlColor="#B9BBBE" />
        {!!groupId && (
          <DropDownMenu
            isBorderHidden
            value={categoryId}
            name="user"
            bgColor={categoryName ? generateColorFromString(categoryName) : ''}
            menuItems={[
              {
                text: t(StringBank.NO_CATEGORY),
                value: null,
                action: () => onCategoryChange(null),
              },
              ...categories.map((category) => ({
                text: category.name,
                value: category.id,
                action: () => onCategoryChange(category.id),
              })),
              {
                text: t(StringBank.ADD_NEW_CATEGORY),
                textColor: 'text.secondary',
                value: 'new',
                action: () => setOpenDialogState(true),
                icon: <AddIcon sx={{ color: 'text.secondary', marginLeft: '-0.25rem' }} />,
              },
            ]}
            buttonText={t(StringBank.CATEGORY)}
            endIcon={<KeyboardArrowDown />}
            styleVariant={VariantType.SECONDARY}
          />
        )}
      </Stack>
      <Stack gap={1}>
        <Typography variant="h3">{t(StringBank.ADD_RATIONALE_HEADER)}</Typography>
        <InputBase
          value={rationale}
          placeholder={t(StringBank.ADD_RATIONALE_PARAGRAPH)}
          onChange={(event) => onRationaleChange(event.target.value)}
          multiline
        />
      </Stack>
      <Dialog
        openDialogState={openDialogState}
        title={t(StringBank.ADD_NEW_CATEGORY)}
        content=""
        onClose={() => setOpenDialogState(false)}
        onSubmit={onCreateCategory}
        cancelTitle={t(StringBank.CANCEL)}
        SubmitTitle={t(StringBank.CREATE)}
        textboxPlaceholder={t(StringBank.ADD_NEW_CATEGORY)}
        isTextBox
      />
    </>
  );
}

export default NameAndRationale;
