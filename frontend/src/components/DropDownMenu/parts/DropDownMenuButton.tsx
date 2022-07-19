import { Button as MuiButton, ButtonProps } from '@mui/material';
import { FC } from 'react';

interface IButtonProps extends ButtonProps {
  isUser: boolean;
  isBorderHidden?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DropDownMenuButton: FC<IButtonProps> = ({ children, isUser, isBorderHidden, ...rest }) => {
  return <MuiButton {...rest}>{children}</MuiButton>;
};

export default DropDownMenuButton;
