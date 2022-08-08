import { DialogElement, DialogInput } from './style';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import DialogProps from './types';
import { StringBank } from 'strings';
import { t } from 'i18next';

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
      <DialogTitle>{props.title}</DialogTitle>
      <DialogInput placeholder={t(StringBank.MY_NEW_CATEGORY)} />
      <DialogActions>
        <Button onClick={props.closeFunction}>Cancel</Button>
        <Button onClick={props.closeFunction}>Create</Button>
      </DialogActions>
    </DialogElement>
  );
}
