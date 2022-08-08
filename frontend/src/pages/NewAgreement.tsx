import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { StringBank } from '../strings';
import React, { FC } from 'react';
import { useState, useContext } from 'react';
import { CategorySelect } from '../components';
import { Button, Stack, Typography, InputBase, Container } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { GroupContext } from 'contexts/group';
import { addAgreement as addAgreementMutation } from 'utils/mutations';
import styled from 'styled-components';
import DialogEl from '../components/Dialog';

const Span = styled.span`
  ${(props) => props.theme.typography.h2};
  minwidth: 1rem;
  outline: none;
`;

const NewAgreement: FC = () => {
  const { t } = useTranslation();
  const { id } = useContext(GroupContext);

  const [agreementName, setAgreementName] = useState<string>(
    t(StringBank.NEW_AGREEMENT_NAME_DEFAULT)
  );
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [rationale, setRationale] = useState(''); //@todo default to value in extant record if one exists
  const groupId = id;

  const [
    addAgreement,
    { data: addAgreementData, loading: addAgreementLoading, error: addAgreementError },
  ] = useMutation(addAgreementMutation, { refetchQueries: ['agreements'] });
  const isContinueEnabled =
    agreementName !== t(StringBank.NEW_AGREEMENT_NAME_DEFAULT) &&
    rationale &&
    !addAgreementLoading &&
    !addAgreementError &&
    addAgreementData === undefined;
  const handleContinueClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    addAgreement({
      variables: {
        category_id: categoryId,
        group_id: groupId,
        name: agreementName,
        rationale: rationale,
      },
    });
  };

  const [openDialogState, setOpenDialogState] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialogState(true);
  };
  const handleCloseDialog = () => {
    setOpenDialogState(false);
  };

  return (
    <Container maxWidth="md">
      <Stack justifyContent="center" spacing={8} sx={{ marginTop: '1em' }}>
        <Stack direction="row" spacing={0} alignItems="center" justifyContent="flex-start">
          <Span
            onBlur={(e) => setAgreementName(e.target.textContent || '')}
            contentEditable
            suppressContentEditableWarning
          >
            {agreementName}
          </Span>
          <EditOutlinedIcon htmlColor="#B9BBBE" sx={{ marginInlineEnd: '0.5rem' }} />
          {!!groupId && (
            <CategorySelect
              categoryId={categoryId}
              onChange={(newCategoryId) => setCategoryId(newCategoryId)}
            />
          )}
        </Stack>
        <Stack spacing={1}>
          <Typography variant="h3">{t(StringBank.ADD_RATIONALE_HEADER)}:</Typography>
          <InputBase
            value={rationale}
            placeholder={t(StringBank.ADD_RATIONALE_PARAGRAPH)}
            onChange={(event) => setRationale(event.target.value)}
            multiline
          />
        </Stack>
        <Stack flexDirection="row-reverse" alignItems="center" justifyContent="flex-start">
          <Button
            variant="contained"
            onClick={(event) => handleContinueClick(event)}
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
        content="My New Category"
        closeFunction={handleCloseDialog}
      ></DialogEl>
    </Container>
  );
};

export default NewAgreement;
