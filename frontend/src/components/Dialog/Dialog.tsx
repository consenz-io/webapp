import * as SC from './style';
import { Button, Dialog, Stack, Typography, IconButton } from '@mui/material';
import { ReactComponent as Xbtn } from 'assets/icons/x-circle.svg';
import DialogProps from './types';
import { useState } from 'react';

export default function DialogEl(props: DialogProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const donBtnColor = props.doneBtnColor ? props.doneBtnColor : 'primary';
  const doneBtnVariant = props.doneBtnVariant ? props.doneBtnVariant : 'contained';
  return (
    <Dialog
      PaperProps={{
        sx: {
          width: '640px',
          height: '256px',
          backgroundColor: '#3f4550',
          borderRadius: '8px',
          backgroundImage: 'none',
        },
      }}
      open={props.openDialogState}
      onClose={props.cancleFunction}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        textAlign="left"
        margin="auto"
        width="100%"
        padding="0 2rem"
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
          <Xbtn />
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
      <SC.InputWrapper>
        <SC.DialogInput
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          placeholder={props.placeHolderText}
        />
      </SC.InputWrapper>
      <SC.ActionsContainer>
        <Button onClick={props.cancleFunction}>{props.cancleBtnText}</Button>
        <Button
          color={donBtnColor}
          variant={doneBtnVariant}
          onClick={() => {
            props.finishFunction(inputValue);
          }}
        >
          {props.finishBtnText}
        </Button>
      </SC.ActionsContainer>
    </Dialog>
  );
}
