import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { StringBank } from '../strings';
import { useTheme } from '@mui/material/styles';
import React, { FC } from 'react';
import { useState, useEffect, useContext, useCallback, useRef, useLayoutEffect } from 'react';
import { addAgreementMutation } from 'utils/queries';
import { CategorySelect } from '../components';
import { Button, Stack, Typography, InputBase } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { GroupContext } from 'contexts/group';

const NewAgreement: FC = () => {
  const { i18n, t } = useTranslation();
  const { id } = useContext(GroupContext);
  const theme = useTheme();

  //@todo implement stepper: https://mui.com/material-ui/react-stepper/

  /**
   * Agreement Name
   */
  const [agreementName, setAgreementName] = useState<string>(
    t(StringBank.NEW_AGREEMENT_NAME_DEFAULT)
  ); //@todo default to value in extant record if one exists
  const [isNameEdited, setIsNameEdited] = useState(false); //@todo set true when name is loaded from extant record in Hasura
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
  const [categoryId, setCategoryId] = useState<number | null>(null); //@todo set default based on extant record in Hasura
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
  const [rationale, setRationale] = useState(''); //@todo default to value in extant record if one exists
  const [isRationaleEdited, setIsRationaleEdited] = useState(false); //@todo set true when name is loaded from extant record in Hasura

  /**
   * "Continue" and insert new agreement
   */
  const [
    addAgreement,
    { data: addAgreementData, loading: addAgreementLoading, error: addAgreementError },
  ] = useMutation(addAgreementMutation, { refetchQueries: ['agreements'] });
  const isContinueEnabled =
    isNameEdited &&
    isRationaleEdited &&
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
    <Stack
      justifyContent="center"
      spacing={8}
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
            setRationale(event.target.value);
            setIsRationaleEdited(true);
          }}
          sx={{
            lineHeight: '1.45em',
            paddingTop: '0.2em',
            ...theme.typography.body1,
          }}
          multiline
          autoComplete="off"
        />
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
