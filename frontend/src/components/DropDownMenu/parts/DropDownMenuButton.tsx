import { Button as MuiButton, ButtonProps } from '@mui/material';
import { FC } from 'react';

interface IButtonProps extends ButtonProps {
  isUser: boolean;
  isBorderHidden?: boolean;
}

const DropDownMenuButton: FC<IButtonProps> = ({ children, ...rest }) => {
  return <MuiButton {...rest}>{children}</MuiButton>;
};

export default DropDownMenuButton;
