import * as SC from "./style";
import { Sidebar } from "components";
import { FC, useState } from "react";
import { Outlet } from "react-router-dom";

export const SidebarLayout:FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {<Sidebar open={open} setOpen={setOpen} />}
      <SC.Container>
        <SC.Wrapper>
          <Outlet context={{sidebar: {open, setOpen}}}/>
        </SC.Wrapper>
      </SC.Container>
    </>
  );
};
