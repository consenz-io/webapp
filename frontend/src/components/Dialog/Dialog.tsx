import { DialogMainTitle, DialogInput, DialogButton, CloseButton, ActionsContainer } from './style';
// import DialogTitle from '@mui/material/DialogTitle';
import { Button, Dialog } from '@mui/material';
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
          width: '640px',
          height: '226px',
        },
      }}
      open={props.openDialogState}
      onClose={props.closeFunction}
    >
      <div className="titleContainer">
        <DialogMainTitle>{props.title}</DialogMainTitle>
        <CloseButton onClick={props.closeFunction}>
          <CloseIcon />
        </CloseButton>
      </div>
      <DialogInput
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        placeholder={t(StringBank.MY_NEW_CATEGORY)}
      />
      <ActionsContainer>
        <Button onClick={props.closeFunction}>Cancel</Button>
        <DialogButton
          onClick={() => {
            props.createFunction(inputValue);
          }}
        >
          Create
        </DialogButton>
      </ActionsContainer>
    </Dialog>
  );
}
