import { DialogInput, ActionsContainer } from './style';
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
          width: '70%',
          height: '226px',
        },
      }}
      open={props.openDialogState}
      onClose={props.closeFunction}
    >
      <Stack gap="18rem" direction="row" alignItems="center" justifyContent="space-around">
        <Typography variant="h3">{props.title}</Typography>
        <IconButton onClick={props.closeFunction}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="flex-start" paddingLeft="2.5rem">
        <Typography variant="body1">{props.content}</Typography>
      </Stack>
      <DialogInput
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        placeholder={props.placeHolderText}
      />
      <ActionsContainer>
        <Button onClick={props.closeFunction}>{props.closeBtnText}</Button>
        <Button
          variant="contained"
          onClick={() => {
            props.createFunction(inputValue);
          }}
        >
          {props.doneBtnText}
        </Button>
      </ActionsContainer>
    </Dialog>
  );
}
