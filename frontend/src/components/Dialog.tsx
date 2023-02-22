import {
  Dialog as MuiDialog,
  Stack,
  Typography,
  IconButton,
  Button,
  TextField,
  DialogActions,
} from '@mui/material';
import { ReactComponent as Xbtn } from 'assets/icons/x-circle.svg';
import { useState } from 'react';
import { textSecondaryColor } from 'theme';
import { SvgIcon } from 'components';
import { secondaryDarkColor } from 'theme/theme';

interface DialogProps {
  title: string;
  content?: string;
  openDialogState: boolean;
  onClose?: () => void;
  onSubmit: (val: string) => void;
  cancelTitle?: string;
  SubmitTitle: string;
  textboxPlaceholder?: string;
  isTextBox?: boolean;
  doneBtnColor?:
    | 'primary'
    | 'inherit'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | undefined;
  doneBtnVariant?: 'text' | 'contained' | 'outlined' | 'delete' | undefined;
}

export default function Dialog(props: DialogProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const donBtnColor = props.doneBtnColor ? props.doneBtnColor : 'primary';
  const doneBtnVariant = props.doneBtnVariant ? props.doneBtnVariant : 'contained';
  return (
    <MuiDialog
      PaperProps={{
        sx: {
          backgroundColor: secondaryDarkColor,
          borderRadius: '8px',
          backgroundImage: 'none',
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        },
      }}
      maxWidth="sm"
      fullWidth
      open={props.openDialogState}
      onClose={props.onClose}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography fontSize={22} fontWeight={600}>
          {props.title}
        </Typography>
        {props.onClose && (
          <IconButton onClick={props.onClose} edge="end">
            <SvgIcon htmlColor={textSecondaryColor}>
              <Xbtn />
            </SvgIcon>
          </IconButton>
        )}
      </Stack>
      {props.content && (
        <Typography variant="body2" color="text.secondary">
          {props.content}
        </Typography>
      )}
      {props.isTextBox && (
        <TextField
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          placeholder={props.textboxPlaceholder}
        />
      )}
      <DialogActions sx={{ padding: 0, gap: 1 }}>
        {props.onClose && <Button onClick={props.onClose}>{props.cancelTitle}</Button>}
        <Button
          color={donBtnColor}
          variant={doneBtnVariant}
          onClick={() => {
            props.onSubmit(inputValue);
          }}
        >
          {props.SubmitTitle}
        </Button>
      </DialogActions>
    </MuiDialog>
  );
}
