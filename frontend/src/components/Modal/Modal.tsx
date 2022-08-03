import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as SC from './style';
import { ModalProps } from '../../types/entities';

function ModalEl(props: ModalProps) {
  return (
    <SC.ModalElement
      open={props.open}
      onClose={() => {
        props.handleClose(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          New Category
        </Typography>
        <input type="text" placeholder="My New Category" />
      </Box>
    </SC.ModalElement>
  );
}

export default ModalEl;
