/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button as MuiButton, ButtonProps } from '@mui/material';
import { FC } from 'react';

interface IButtonProps extends ButtonProps {
  isUser: boolean;
  isBorderHidden?: boolean;
  styleVariant?: 'secondary';
}

const DropDownMenuButton: FC<IButtonProps> = ({
  children,
  isUser,
  isBorderHidden,
  styleVariant,
  ...rest
}) => {
  return <MuiButton {...rest}>{children}</MuiButton>;
};

export default DropDownMenuButton;
