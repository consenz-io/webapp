import * as SC from "./style";
import { Sidebar } from "components";
import {FC, useState} from "react";
import { Outlet } from "react-router-dom";

export const SidebarLayout :FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSidebarToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <Sidebar mobileOpen={mobileOpen} handleSidebarToggle={handleSidebarToggle} />
      <SC.Wrapper>
        <Outlet context={{sidebar: {mobileOpen, handleSidebarToggle}}}/>
      </SC.Wrapper>
    </>
  );
};
