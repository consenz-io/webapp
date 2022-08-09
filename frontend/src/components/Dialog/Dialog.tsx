import { DialogMainTitle, DialogElement, DialogInput, DialogButton, CloseButton } from './style';
import DialogActions from '@mui/material/DialogActions';
// import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import DialogProps from './types';
import { StringBank } from 'strings';
import { t } from 'i18next';
// import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './Dialog.css';

export default function DialogEl(props: DialogProps) {
  return (
    <DialogElement
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
      <DialogInput placeholder={t(StringBank.MY_NEW_CATEGORY)} />
      <DialogActions>
        <Button onClick={props.closeFunction}>Cancel</Button>
        <DialogButton onClick={props.createFunction}>Create</DialogButton>
      </DialogActions>
    </DialogElement>
  );
}
