import * as SC from "./style";
import { Sidebar } from "components";
import {FC, useEffect, useState} from "react";
import { Outlet } from "react-router-dom";

export const SidebarLayout:FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSidebarToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      {<Sidebar mobileOpen={mobileOpen} handleSidebarToggle={handleSidebarToggle} />}
      <SC.Container>
        <SC.Wrapper>
          <Outlet context={{sidebar: {mobileOpen, handleSidebarToggle}}}/>
        </SC.Wrapper>
      </SC.Container>
    </>
  );
};
