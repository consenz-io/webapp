import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { StringBank } from '../strings';
import { useTheme } from '@mui/material/styles';
import React, { FC } from 'react';
import { useState, useEffect, useContext, useCallback, useRef, useLayoutEffect } from 'react';
import {
  agreementDetailsQuery,
  agreementTopicsSectionsSuggestionsQuery,
  addAgreementMutation,
  updateAgreementMutation,
} from 'utils/queries';
import { CategorySelect, NewTopicsEditor } from '../components';
import { Button, Stack, Typography, InputBase, Divider } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { GroupContext } from 'contexts/group';

const NewAgreement: FC = () => {
  const { i18n, t } = useTranslation();
  const { id } = useContext(GroupContext);
  const theme = useTheme();

  /**
   * Saved and restore agreement state in case of browser refresh
   */
  const sessionStorageKey = 'consenz-new-agreement-id';
  const [agreementId, setAgreementId] = useState(
    sessionStorage.getItem(sessionStorageKey) as unknown | null as number | null
  );
  const [savedData, setSavedData] = useState<{
    id: number;
    name: string;
    category_id: number;
    rationale: string;
  } | null>(null);
  const { /* loading, data, */ error: agreementQueryError } = useQuery(agreementDetailsQuery, {
    variables: { id: agreementId },
    onCompleted: (data) => {
      const record = data.core_agreements?.at(0);
      if (!record || !record.name || !record.rationale) return;
      setSavedData(record);
      setAgreementName(record.name);
      setIsNameEdited(true);
      setCategoryId(record.category_id);
      setRationale(record.rationale);
      setIsRationaleEdited(true);
      setTopicsAndSections(record.topics as Array<object>);
    },
    skip: agreementId === null || savedData !== null,
  });
  if (agreementQueryError) console.log(agreementQueryError);

  //@todo implement stepper: https://mui.com/material-ui/react-stepper/

  /**
   * Agreement Name
   */
  const [agreementName, setAgreementName] = useState<string>(
    t(StringBank.NEW_AGREEMENT_NAME_DEFAULT)
  );
  const [isNameEdited, setIsNameEdited] = useState(false);
  const handleAgreementNameChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setAgreementName(event.target.value);
    setIsNameEdited(true);
    setIsNameMeasuring(true); // Prepare to re-measure the Agreement Name field's content.
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
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const groupId = id;

  /**
   * Manage dynamic widths and layout of elements in the Agreement Name line.
   */
  const [nameMaxWidth, setNameMaxWidth] = useState(0);
  const [nameIconsOffset, setNameIconsOffset] = useState(0);
  const [isNameMeasuring, setIsNameMeasuring] = useState(false);
  const refNameMeasuringBox = useRef<HTMLElement>(null);
  const refNameLine = useRef<HTMLDivElement>(null);
  const refNameIcons = useRef<HTMLElement>(null);
  const measureNameFieldRegion = useCallback(() => {
    // Calculate the Agreement Name field's available horizontal space.
    const nameLineWidth = refNameLine?.current?.getBoundingClientRect().width || 0;
    const nameIconsWidth = refNameIcons?.current?.getBoundingClientRect().width || 0;
    if (nameLineWidth > 0) setNameMaxWidth(nameLineWidth - nameIconsWidth);
    setIsNameMeasuring(true);
  }, [setNameMaxWidth, refNameLine, refNameIcons]);
  const measureNameFieldContent = useCallback(() => {
    // Calculate the Agreement Name field's content width and position icons accordingly.
    if (isNameMeasuring && refNameMeasuringBox?.current) {
      const nameLineWidth = refNameLine?.current?.getBoundingClientRect().width || 0;
      const nameIconsWidth = refNameIcons?.current?.getBoundingClientRect().width || 0;
      const editedTextWidth = refNameMeasuringBox.current?.getBoundingClientRect().width || 0;
      if (
        nameIconsWidth > 0 &&
        editedTextWidth > 0 &&
        nameLineWidth > nameIconsWidth + editedTextWidth
      ) {
        setNameIconsOffset(nameLineWidth - nameIconsWidth - editedTextWidth);
      }
      setIsNameMeasuring(false);
    }
  }, [refNameLine, refNameIcons, isNameMeasuring, setIsNameMeasuring]);
  // When viewport resizes, re-measure all elements in the Agreement Name line.
  useEffect(() => {
    window.addEventListener('resize', measureNameFieldRegion);
    return () => {
      window.removeEventListener('resize', measureNameFieldRegion);
    };
  }, [measureNameFieldRegion]);
  // When category changes, re-measure all elements in the Agreement Name line.
  useLayoutEffect(measureNameFieldRegion, [measureNameFieldRegion, categoryId]);
  // When Agreement Name content changes, re-measure just its content
  useLayoutEffect(measureNameFieldContent, [measureNameFieldContent, isNameMeasuring]);

  /**
   * Rationale
   */
  const [rationale, setRationale] = useState('');
  const [isRationaleEdited, setIsRationaleEdited] = useState(false);

  /**
   * Agreement insert
   */
  const [
    addAgreement,
    { data: addAgreementData, loading: addAgreementLoading, error: addAgreementError },
  ] = useMutation(addAgreementMutation, {
    refetchQueries: ['agreements'],
    onCompleted: (data) => {
      // When new agreement is saved and new record id comes back from hasura, update state and sessionStorage
      if (data?.insert_core_agreements_one.id && agreementId === null) {
        const newAgreementId = data.insert_core_agreements_one.id;
        sessionStorage.setItem(sessionStorageKey, newAgreementId as unknown as string);
        setAgreementId(newAgreementId);
        setSavedData(data.insert_core_agreements_one);
      }
    },
  });
  if (addAgreementError) console.log(addAgreementError);

  /**
   * Agreement update
   */
  const [
    updateAgreement,
    {
      // data: updateAgreementData,
      // loading: updateAgreementLoading,
      error: updateAgreementError,
    },
  ] = useMutation(updateAgreementMutation, {
    refetchQueries: ['agreements'],
    onCompleted: (data) => data && setSavedData(data.update_core_agreements_by_pk),
  });
  if (updateAgreementError) console.log(updateAgreementError);

  const handleAgreementDetailsUpdate = useCallback(() => {
    if (agreementId === null) return; // Only for step 2
    if (!savedData || !agreementName || !categoryId || !rationale) return; // Need complete data.
    if (
      // Need a change to warrant saving.
      agreementName !== savedData.name ||
      categoryId !== savedData.category_id ||
      rationale !== savedData.rationale
    ) {
      updateAgreement({
        variables: {
          id: agreementId,
          category_id: categoryId,
          name: agreementName,
          rationale: rationale,
        },
      });
    }
  }, [agreementId, savedData, agreementName, categoryId, rationale, updateAgreement]);
  useEffect(() => {
    // In step 2, update hasura each time category changes, but only when name or rationale changes *and then* is blurred.
    if (savedData && categoryId !== savedData.category_id) handleAgreementDetailsUpdate();
  }, [categoryId, savedData, handleAgreementDetailsUpdate]);

  /**
   * Topics and Sections
   */
  const [topicsAndSections, setTopicsAndSections] = useState<Array<object>>([]);
  const [loadAgreementTopicsSectionsSuggestions /*, { called, loading, data }*/] = useLazyQuery(
    agreementTopicsSectionsSuggestionsQuery,
    {
      variables: { agreement_id: agreementId },
      onCompleted: (data) => setTopicsAndSections(data.core_topics || []),
      onError: (error) => console.log(error),
    }
  );
  useEffect(() => {
    if (agreementId !== null) loadAgreementTopicsSectionsSuggestions();
  }, [agreementId, loadAgreementTopicsSectionsSuggestions]);

  /**
   * "Continue" button
   */
  const isContinueEnabled =
    agreementId === null // Step 1
      ? isNameEdited &&
        isRationaleEdited &&
        !addAgreementLoading &&
        !addAgreementError &&
        addAgreementData === undefined
      : // Step 2
        savedData === null; //@todo: replace with the actual topics+sections conditions
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

  return (
    <Stack
      justifyContent="center"
      spacing={4}
      paddingLeft="15%"
      paddingRight="15%"
      component="form"
      sx={{ marginTop: '1em' }}
    >
      {/* Agreement Name row */}
      <div ref={refNameLine}>
        <Stack direction="row" spacing={0} alignItems="center" justifyContent="flex-start">
          <div style={{ width: nameMaxWidth }}>
            <InputBase
              placeholder={t(StringBank.AGREEMENT_NAME_FIELD)}
              value={agreementName}
              color="primary"
              onChange={handleAgreementNameChange}
              onBlur={handleAgreementDetailsUpdate}
              sx={{
                paddingTop: '0.3em',
                ...theme.typography.h2,
              }}
              multiline
              fullWidth
              autoComplete="off"
            />
            <span
              ref={refNameMeasuringBox}
              style={{
                boxSizing: 'border-box',
                display: isNameMeasuring ? 'inline-block' : 'inline-block',
                whiteSpace: 'break-spaces',
                ...theme.typography.h2,
              }}
            >
              {isNameMeasuring &&
                (agreementName === '' ? t(StringBank.AGREEMENT_NAME_FIELD) : agreementName)}
            </span>
          </div>
          <Stack
            direction="row"
            spacing={0}
            alignItems="center"
            justifyContent="flex-start"
            ref={refNameIcons}
            sx={{
              position: 'relative',
              left: theme.direction === 'ltr' ? -nameIconsOffset : 0,
              right: theme.direction === 'rtl' ? -nameIconsOffset : 0,
              paddingLeft: theme.direction === 'ltr' ? '0.5em' : 0,
              paddingRight: theme.direction === 'rtl' ? '0.5em' : 0,
            }}
          >
            <EditOutlinedIcon
              sx={{
                color: '#B9BBBE',
                marginRight: theme.direction === 'ltr' ? '0.5em' : 0,
                marginLeft: theme.direction === 'rtl' ? '0.5em' : 0,
              }}
            />
            {groupId !== undefined && (
              <CategorySelect
                categoryId={categoryId}
                onChange={(newCategoryId) => setCategoryId(newCategoryId)}
                onReady={measureNameFieldRegion}
                onSelecting={measureNameFieldRegion}
              />
            )}
          </Stack>
        </Stack>
      </div>
      {/* Add rationale */}
      <Stack spacing={1}>
        <Typography variant="h3">{t(StringBank.ADD_RATIONALE_HEADER)}:</Typography>
        <InputBase
          value={rationale}
          placeholder={t(StringBank.ADD_RATIONALE_PARAGRAPH)}
          color="primary"
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            //@todo: should this be moved to onBlur for performance?
            setRationale(event.target.value);
            setIsRationaleEdited(true);
          }}
          onBlur={handleAgreementDetailsUpdate}
          sx={{
            lineHeight: '1.45em',
            paddingTop: '0.2em',
            ...theme.typography.body1,
          }}
          multiline
          autoComplete="off"
        />
      </Stack>
      {/* Topics and Sections */}
      {agreementId && savedData && (
        <>
          <Divider variant="middle" />
          <NewTopicsEditor agreementId={agreementId} data={topicsAndSections} />
        </>
      )}
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
