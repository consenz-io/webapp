import { DialogInput, ActionsContainer, InputWrapper } from './style';
import { Button, Dialog, IconButton, Stack, Typography } from '@mui/material';
import DialogProps from './types';
import CloseIcon from '@mui/icons-material/Close';
import './Dialog.css';
import { useState } from 'react';

export default function DialogEl(props: DialogProps) {
  const [inputValue, setInputValue] = useState<string>('');
  return (
    <Dialog
      PaperProps={{
        sx: {
          width: '640px',
          height: '256px',
          backgroundColor: '#3f4550',
          borderRadius: '8px',
        },
      }}
      open={props.openDialogState}
      onClose={props.cancleFunction}
    >
      <Stack
        gap="19rem"
        direction="row"
        alignItems="center"
        justifyContent="space-around"
        textAlign="left"
        margin="auto"
      >
        <Typography
          sx={{
            fontFamily: 'Lato',
            fontSize: '22px',
            fontWeight: '600',
          }}
        >
          {props.title}
        </Typography>
        <IconButton onClick={props.cancleFunction}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <Stack
        textAlign="left"
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        paddingLeft="2.5rem"
      >
        <Typography
          sx={{
            fontFamily: 'Lato',
            fontSize: '14px',
            color: '#adb2b8',
            paddingBottom: '0.8rem',
          }}
          variant="body1"
        >
          {props.content}
        </Typography>
      </Stack>
      <InputWrapper>
        <DialogInput
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          placeholder={props.placeHolderText}
        />
      </InputWrapper>
      <ActionsContainer>
        <Button onClick={props.cancleFunction}>{props.closeBtnText}</Button>
        <Button
          variant="contained"
          onClick={() => {
            props.finishFunction(inputValue);
          }}
        >
          {props.doneBtnText}
        </Button>
      </ActionsContainer>
    </Dialog>
  );
}
