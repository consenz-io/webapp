import { InputBase, Stack, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { StringBank } from 'strings';
import styled from 'styled-components';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { DropDownMenu } from 'components';
import { GroupContext } from 'contexts/group';
import { useTranslation } from 'react-i18next';
import { Category, VariantType } from 'types';
import Dialog from 'components/Dialog';
import { useMutation } from '@apollo/client';
import { addCategoryMutation } from 'utils/mutations';
import { generateColorFromString } from 'utils/functions';

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
  rationale: string;
}

interface CategoryObj {
  name: string;
  color: string;
}

interface CategoryMap {
  [key: string | number]: CategoryObj;
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
  const [categoryIdNameMap, setcategoryIdNameMap] = useState<CategoryMap>({});

  const { t } = useTranslation();
  const [createCategoryMutationFN, { error: newCatError }] = useMutation(addCategoryMutation, {
    refetchQueries: ['categories'],
  });

  const handleCloseDialog = () => {
    setOpenDialogState(false);
  };

  useEffect(() => {
    const newIdNameMap: CategoryMap = { ...categoryIdNameMap };
    categories.forEach((catObj: Category) => {
      newIdNameMap[catObj.id] = {
        name: catObj.name,
        color: generateColorFromString(catObj.name, true),
      };
    });
    setcategoryIdNameMap(newIdNameMap);
  }, [categories, categoryIdNameMap]);

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
            bgColor={categoryId ? categoryIdNameMap[categoryId]?.color : ''}
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
        cancelFunction={handleCloseDialog}
        finishFunction={onCreateCategory}
        cancelBtnText={t(StringBank.CANCEL)}
        finishBtnText={t(StringBank.CREATE)}
        placeHolderText={t(StringBank.ADD_NEW_CATEGORY)}
        isTextBox
      />
    </>
  );
}

export default NameAndRationale;
