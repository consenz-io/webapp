import {Button as MuiButton, ButtonProps} from "@mui/material";

interface IButtonProps extends ButtonProps {
  isUser: boolean;
}

const DropDownMenuButton = ({ isUser = false, children, ...rest }: IButtonProps) => {
  return (
    <MuiButton {...rest}>
      {children}
    </MuiButton>
  );
};

export default DropDownMenuButton;
