import { DialogInput, ActionsContainer } from './style';
// import DialogTitle from '@mui/material/DialogTitle';
import { Button, Dialog, IconButton, Stack, Typography } from '@mui/material';
import DialogProps from './types';
import { StringBank } from 'strings';
import { t } from 'i18next';
// import IconButton from '@mui/material/IconButton';
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
      <Stack gap="19rem" direction="row" alignItems="center" justifyContent="space-around">
        <Typography variant="h3">{props.title}</Typography>
        <IconButton onClick={props.closeFunction}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <Typography variant="body1">{props.content}</Typography>
      <DialogInput
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        placeholder={t(StringBank.MY_NEW_CATEGORY)}
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
