import * as SC from "./style";
import { FC } from "react";
import { IFCProps } from "./types";
import { useResponsive } from "hooks";

const Sidebar:FC<IFCProps> = ({ mobileOpen, handleSidebarToggle }) => {
  const { isMobile } = useResponsive();

  console.log("ismobile", isMobile);
  const content = (
    <>
      <span>Sidebar</span>
    </>
  );

  return (
    <>
      <SC.Container>
        <nav>
          {isMobile
            ?
            <SC.Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleSidebarToggle}
              ModalProps={{
                keepMounted: true
              }}
            >
              {content}
            </SC.Drawer>
            :
            <SC.Drawer
              variant="persistent"
              anchor="left"
              open
            >
              {content}
            </SC.Drawer>
          }
        </nav>
      </SC.Container>
    </>
  );
};

export default Sidebar;
