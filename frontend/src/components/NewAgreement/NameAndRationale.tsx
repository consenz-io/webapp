import { InputBase, Stack, Typography } from '@mui/material';
import { FC, useContext } from 'react';
import { StringBank } from 'strings';
import styled from 'styled-components';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { CategorySelect } from '..';
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
  onCategoryChange: (value: number) => void;
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
  const { id: groupId } = useContext(GroupContext);
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
          <CategorySelect
            categoryId={categoryId}
            onChange={(newCategoryId) => onCategoryChange(newCategoryId)}
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
