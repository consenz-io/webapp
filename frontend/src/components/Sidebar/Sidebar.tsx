import * as React from "react";
import * as SC from "./style";
import { FC } from "react";
import {IFCProps} from "./types";

const Sidebar:FC<IFCProps> = ({ open, setOpen }) => {
  console.log("Sidebar is opened: ", open);

  return (
    <SC.Drawer
      variant="temporary"
      anchor="left"
      open={open}
      onClose={(_, reason) =>
        reason === "backdropClick" && setOpen(false)
      }
    >
   sidebar content
    </SC.Drawer>
  );
};

export default Sidebar;
