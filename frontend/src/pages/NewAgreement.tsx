import { useTranslation } from 'react-i18next';
import { StringBank } from '../strings';
import React, { FC, useState, useRef, useEffect, useCallback } from 'react';
// import { useParams } from 'react-router-dom';
// import { DataContext } from '../contexts/data';
import { Button, Stack, Typography, TextField } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const NewAgreement: FC = () => {
  const { i18n, t } = useTranslation();
  // const { groupSlug } = useParams();
  // const { user } = useContext(DataContext);
  // const getGroupBySlug = (slug?: string) => user?.groups?.find((group) => group.slug === slug);

  //@todo implement stepper: https://mui.com/material-ui/react-stepper/

  const handleNameEditClick = () => {
    setIsNameEditing(true);
  };

  const handleContinueClick = (e: React.MouseEvent<HTMLElement>) => {
    //@todo insert agreement mutation
    //@todo increase step
    e.preventDefault();
  };

  // Agreement Name editing
  const [agreementName, setAgreementName] = useState<string>(
    t(StringBank.NEW_AGREEMENT_NAME_DEFAULT)
  ); //@todo default to value in extant record if one exists
  const [isNameEdited, setIsNameEdited] = useState(false); //@todo set true when name is loaded from extant record in Hasura
  const [isNameEditing, setIsNameEditing] = useState(false);
  const nameEditRef = useRef<HTMLDivElement>(null);
  const handleNameEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      // Escape reverts edits to the name.
      setIsNameEditing(false);
    } else if (e.key === 'Enter') {
      // Enter persists edits to the name.
      e.preventDefault();
      const input: HTMLInputElement | null = document.querySelector('input#agreement-name');
      if (input !== null && input.value !== '') {
        setAgreementName(input.value);
        setIsNameEdited(true);
        setIsNameEditing(false);
      }
    } else if (e.key === '`') {
      //@todo: Decide how we want to handle the user enterting backticks, which will switch the langugae.
    }
  };
  //@todo click away listener to duplicate Escape behavior
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

  return (
    <Stack justifyContent="flex-start" spacing={8} width="80%">
      <Stack alignItems="center" justifyContent="center" component="form" autoComplete="off">
        {isNameEditing ? (
          <TextField
            id="agreement-name"
            label={t(StringBank.AGREEMENT_NAME_FIELD)}
            variant="standard"
            onKeyDown={handleNameEditKeyDown}
            defaultValue={agreementName}
            ref={nameEditRef}
            autoFocus
          />
        ) : (
          <Typography variant="h2">
            {agreementName} <EditOutlinedIcon onClick={handleNameEditClick} />
          </Typography>
        )}
      </Stack>
      <Stack flexDirection="row-reverse" alignItems="center" justifyContent="flex-start">
        <Button variant="contained" onClick={(event) => handleContinueClick(event)}>
          {t(StringBank.CONTINUE)}
        </Button>
      </Stack>
    </Stack>
  );
};

export default NewAgreement;
