import React, {FC, useState} from "react";
import { IFCProps } from "./types";
import * as SC from "./style";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Menu from "@mui/material/Menu";
import {useNavigate} from "react-router-dom";

const DropDownMenu: FC<IFCProps> = ({ name, buttonText, menuItems, endIcon, btnCapital }) => {
  // const {globalUser} = useContext(DataContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const open = Boolean(anchorEl);
  // const {groups, currentGroup} = globalUser;

  const handleClickListItem = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget); //TODO fix anchorEl error on console
  };

  const handleMenuItemClick = (e: React.MouseEvent<HTMLElement>, index: number, slug: string) => {
    setSelectedIndex(index);
    navigate(`/${slug}/all-agreements`);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return <>
    <List
      component="nav"
      aria-label={`${name} select`}
      sx={{ bgcolor: "background.paper" }}
    >
      <ListItem
        id={`${name}-button`}
        aria-haspopup="listbox"
        aria-controls={`${name}-menu`}
        aria-label="when device is locked" //TODO make dynamic
        aria-expanded={open ? "true" : undefined}
        onClick={handleClickListItem}
      >
        ss
        {/*<ListItemText*/}
        {/*  primary={options[selectedIndex]}*/}
        {/*/>*/}
      </ListItem>
    </List>

    <Menu
      id={`${name}-menu`}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": `${name}-button`,
        role: "listbox",
      }}
    >

      {menuItems.map((menuItem, index) => (
        <SC.DropDownMenuItem
          key={menuItem.slug}
          disabled={index === 0}
          selected={index === selectedIndex}
          onClick={(event) => handleMenuItemClick(event, index, menuItem.slug)}
        >
          {menuItem.name}
        </SC.DropDownMenuItem>
      ))}
    </Menu>
  </>;
};

export default DropDownMenu;
