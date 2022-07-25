import { gql, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { StringBank } from '../strings';
import React, { FC, useState, useEffect, useContext, useCallback } from 'react';
import CategorySelect from '../components/CategorySelect';
import { Button, IconButton, Stack, Typography, TextField } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { GroupContext } from 'contexts/group';

// Mutation to insert new agreement record
const ADD_AGREEMENT = gql`
  mutation AddAgreement($category_id: Int!, $group_id: Int!, $name: String!, $rationale: String!) {
    insert_core_agreements_one(
      object: { category_id: $category_id, group_id: $group_id, name: $name, rationale: $rationale }
    ) {
      id
      category_id
      group_id
      name
      rationale
    }
  }
`;

const NewAgreement: FC = () => {
  const { i18n, t } = useTranslation();
  const { id } = useContext(GroupContext);

  //@todo implement stepper: https://mui.com/material-ui/react-stepper/

  // Text field keyboard control.
  const handleTextEditKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    setIsFieldEditing: (value: boolean) => void,
    setIsFieldEdited: (value: boolean) => void,
    setValue: (value: string) => void,
    querySelector: string
  ) => {
    if (e.key === 'Escape') {
      // Escape reverts edits to the name.
      setIsFieldEditing(false);
    } else if (e.key === 'Enter') {
      // Enter persists edits to the name.
      e.preventDefault();
      const input: HTMLInputElement | HTMLTextAreaElement | null =
        document.querySelector(querySelector);
      if (input !== null && input.value !== '') {
        setValue(input.value);
        setIsFieldEdited(true);
        setIsFieldEditing(false);
      }
    } else if (e.key === '`') {
      //@todo: Decide how we want to handle the user enterting backticks, which will switch the langugae.
    }
  };
  //@todo click away listener to duplicate Escape behavior?

  /**
   * Agreement Name
   */
  const [agreementName, setAgreementName] = useState<string>(
    t(StringBank.NEW_AGREEMENT_NAME_DEFAULT)
  ); //@todo default to value in extant record if one exists
  const [isNameEdited, setIsNameEdited] = useState(false); //@todo set true when name is loaded from extant record in Hasura
  const [isNameEditing, setIsNameEditing] = useState(false);
  const handleNameEditClick = () => {
    setIsNameEditing(true);
  };
  const handleLanguageChanged = useCallback(() => {
    // If name hasn't yet been edited, switch language of the default name.
    if (!isNameEdited) {
      setAgreementName(t(StringBank.NEW_AGREEMENT_NAME_DEFAULT));
    }
  }, [isNameEdited, t]);
  useEffect(() => {
    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [handleLanguageChanged, i18n]);

  /**
   * Category
   */
  const [categoryId, setCategoryId] = useState<number | null>(null); //@todo set default based on extant record in Hasura
  const groupId = id;

  /**
   * Rationale
   */
  const [rationale, setRationale] = useState(''); //@todo default to value in extant record if one exists
  const [isRationaleEdited, setIsRationaleEdited] = useState(false); //@todo set true when name is loaded from extant record in Hasura
  const [isRationaleEditing, setIsRationaleEditing] = useState(false);
  const handleRationaleEditClick = () => {
    setIsRationaleEditing(true);
  };
  const handleBlurRationale = () => {
    const input: HTMLTextAreaElement | null = document.querySelector('textarea#rationale');
    const isContentEntered = input !== null && input.value !== '';
    if (isContentEntered) {
      // Persist entered content on blur.
      setRationale(input.value);
    }
    setIsRationaleEditing(false);
  };

  /**
   * "Continue" and insert new agreement
   */
  const [
    addAgreement,
    { data: addAgreementData, loading: addAgreementLoading, error: addAgreementError },
  ] = useMutation(ADD_AGREEMENT);
  const isContinueEnabled =
    isNameEdited &&
    categoryId &&
    isRationaleEdited &&
    !isNameEditing &&
    !isRationaleEditing &&
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
    //@todo advance step
  };
  if (addAgreementError) {
    console.log(addAgreementError);
  }

  return (
    <Stack justifyContent="center" spacing={8} paddingLeft="15%" paddingRight="15%">
      {/* Title row */}
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        component="form"
        autoComplete="off"
      >
        {isNameEditing ? (
          <TextField
            id="agreement-name"
            label={t(StringBank.AGREEMENT_NAME_FIELD)}
            variant="standard"
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
              handleTextEditKeyDown(
                e,
                setIsNameEditing,
                setIsNameEdited,
                setAgreementName,
                'input#agreement-name'
              )
            }
            defaultValue={agreementName}
            autoFocus
          />
        ) : (
          <>
            <Typography variant="h2">{agreementName}</Typography>
            <IconButton sx={{ marginLeft: '0!important' }} onClick={handleNameEditClick}>
              <EditOutlinedIcon sx={{ color: '#B9BBBE' }} />
            </IconButton>
          </>
        )}
        {groupId !== undefined && (
          <CategorySelect
            groupId={groupId}
            categoryId={categoryId}
            onChange={(newCategoryId) => setCategoryId(newCategoryId)}
          />
        )}
      </Stack>
      {/* Add rationale */}
      <Stack spacing={1}>
        <Typography variant="h3">{t(StringBank.ADD_RATIONALE_HEADER)}:</Typography>
        {isRationaleEditing ? (
          <TextField
            id="rationale"
            variant="standard"
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
              handleTextEditKeyDown(
                e,
                setIsRationaleEditing,
                setIsRationaleEdited,
                setRationale,
                'textarea#rationale'
              )
            }
            defaultValue={rationale}
            multiline
            rows={4}
            autoFocus
            onBlur={handleBlurRationale}
          />
        ) : (
          <Typography
            variant="body1"
            color={!isRationaleEdited && !isRationaleEditing ? '#B9BBBE' : 'white'}
            onClick={handleRationaleEditClick}
            sx={{ minHeight: '6.3em', lineHeight: '1.45em', paddingTop: '0.2em' }}
          >
            {isRationaleEdited ? rationale : t(StringBank.ADD_RATIONALE_PARAGRAPH)}
          </Typography>
        )}
      </Stack>
      {/* Continue button */}
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
  );
};

export default NewAgreement;
