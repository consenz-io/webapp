import * as SC from "./style";
import { Sidebar } from "components";
import { FC } from "react";
import { Outlet } from "react-router-dom";

export const SidebarLayout:FC = () =>
  <>
    <Sidebar/>
    <SC.Container>
      <SC.Wrapper>
        <Outlet />
      </SC.Wrapper>
    </SC.Container>
  </>;
