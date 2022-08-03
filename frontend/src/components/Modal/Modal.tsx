import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function ModalBox() {
  return (
    <Box>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        New Category
      </Typography>
      <input type="text" placeholder="My New Category" />
    </Box>
  );
}

export default ModalBox;
