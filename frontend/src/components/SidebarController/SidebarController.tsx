import { FC } from "react";
import { IFCProps } from "./types";

const SidebarController:FC<IFCProps>= ({ handleSidebarToggle }) => {
  return (
    <button onClick={() => handleSidebarToggle()}>toggle sidebar</button>
  );
};

export default SidebarController;
