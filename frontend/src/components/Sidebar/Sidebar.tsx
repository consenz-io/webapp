import * as React from "react";
import * as SC from "./style";
import { FC } from "react";
import { IFCProps } from "./types";
import { useResponsive } from "hooks";

const Sidebar:FC<IFCProps> = ({ mobileOpen, handleSidebarToggle }) => {
  const { isMobile } = useResponsive();

  return (
    <>
      {isMobile
        ?
        <SC.Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleSidebarToggle}
        >
                sidebar content
        </SC.Drawer>
        :
        <SC.Drawer
          variant="persistent"
          anchor="left"
          open
        >
                sidebar content
        </SC.Drawer>
      }
    </>
  );
};

export default Sidebar;
