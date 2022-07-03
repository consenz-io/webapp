import * as SC from "./style";
import React, {FC, useState} from "react";
import { IFCProps } from "./types";
import CircleIcon from "@mui/icons-material/Circle";
// import {DataContext} from "store";

const DropDownMenu: FC<IFCProps> = ({ name, buttonText, menuItems, endIcon, btnCapital }) => {
  // const {globalUser} = useContext(DataContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  // const {groups, currentGroup} = globalUser;

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget); //TODO fix anchorEl error on console
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return <>
    <SC.DropDownMenuButton
      id={`${name}-button`}
      aria-controls={open ? `${name}-menu` : undefined}
      aria-haspopup="true"
      aria-expanded={open ? "true" : undefined}
      onClick={handleClick}
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
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": `${name}-button`,
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      defaultValue={"daostack"}
    >
      {menuItems.map((menuItem, i) => {
        return (
          <SC.Link key={i} to={`/${menuItem.slug}/all-agreements`} onClick={handleClose}>
            <SC.DropDownMenuItem value={menuItem.slug}>
              <CircleIcon style={{fill: menuItem.color, marginRight: ".5rem", marginLeft: "-.25rem"}} />
              {menuItem.text}
            </SC.DropDownMenuItem>
          </SC.Link>
        );
      })}
    </SC.DropDownMenu>
  </>;
};

export default DropDownMenu;
