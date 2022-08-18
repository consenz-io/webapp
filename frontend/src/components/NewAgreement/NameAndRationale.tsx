import { InputBase, Stack, Typography } from '@mui/material';
import { FC, useContext } from 'react';
import { StringBank } from 'strings';
import styled from 'styled-components';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { DropDownMenu } from 'components';
import { GroupContext } from 'contexts/group';
import { useTranslation } from 'react-i18next';

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

const NameAndRationale: FC<IProps> = ({
  categoryId,
  name,
  onCategoryChange,
  onNameChange,
  onRationaleChange,
  rationale,
}) => {
  const { id: groupId, categories } = useContext(GroupContext);
  const { t } = useTranslation();

  return (
    <>
      <Stack direction="row" spacing={2} alignItems="center">
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
                textColor: '#adb2b8', // TODO: fetch from theme
                value: null,
                action: () => console.log('add new category'),
                icon: <AddIcon sx={{ color: 'text.secondary', marginLeft: '-0.25rem' }} />,
              },
            ]}
            buttonText={t(StringBank.CATEGORY)}
            endIcon={<KeyboardArrowDown />}
            styleVariant="secondary"
          />
        )}
      </Stack>
      <Stack spacing={1}>
        <Typography variant="h3">{t(StringBank.ADD_RATIONALE_HEADER)}</Typography>
        <InputBase
          value={rationale}
          placeholder={t(StringBank.ADD_RATIONALE_PARAGRAPH)}
          onChange={(event) => onRationaleChange(event.target.value)}
          multiline
        />
      </Stack>
    </>
  );
};

export default NameAndRationale;
