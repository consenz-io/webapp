import { DialogElement, DialogInput } from './style';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import DialogProps from './types';

export default function DialogEl(props: DialogProps) {
  return (
    <DialogElement open={props.openDialogState} onClose={props.closeFunction}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogInput />
      <DialogActions>
        <Button
          onClick={() => {
            props.closeFunction();
          }}
        >
          Cancel
        </Button>
        <Button onClick={props.closeFunction}>Create</Button>
      </DialogActions>
    </DialogElement>
  );
}
