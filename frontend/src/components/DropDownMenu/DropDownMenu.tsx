import * as SC from "./style";
import React, { FC } from "react";
import { IFCProps } from "./types";
import CircleIcon from "@mui/icons-material/Circle";

const DropDownMenu: FC<IFCProps> = ({ name, buttonText, menuItems, anchorEl, setAnchorEl, endIcon, btnCapital }) => {
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemOnClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
  };

  return <>
    <SC.DropDownMenuButton
      id={`${name}-button`}
      onClick={handleClick}
      aria-controls={`${name}-menu`}
      aria-haspopup="true"
      aria-expanded={open ? "true" : undefined}
      endIcon={endIcon}
      isUser={!!btnCapital}
    >
      {btnCapital &&
        <SC.BtnCapital className="capital">{btnCapital}</SC.BtnCapital>
      }

      {buttonText}
    </SC.DropDownMenuButton>

    <SC.DropDownMenu
      id={`${name}-menu`}
      open={open}
      MenuListProps={{
        "aria-labelledby": `${name}-button`,
      }}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      {menuItems.map((menuItem, i) => {
        return <SC.DropDownMenuItem
          key={i}
          onClick={handleMenuItemOnClick}
        >
          <CircleIcon style={{fill: menuItem.color, marginRight: ".5rem", marginLeft: "-.25rem"}} />
          {menuItem.text}
        </SC.DropDownMenuItem>;

      })}
    </SC.DropDownMenu>
  </>;
};

export default DropDownMenu;
