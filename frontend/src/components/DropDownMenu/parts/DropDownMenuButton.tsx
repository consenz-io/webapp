/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button as MuiButton, ButtonProps } from "@mui/material";
import { FC } from "react";
import { VariantType } from "types";

interface IButtonProps extends ButtonProps {
  isUser: boolean;
  isBorderHidden?: boolean;
  styleVariant?: VariantType;
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
