import { FC } from "react";
import { IFCProps } from "./types";

const SidebarController:FC<IFCProps>= ({ handleSidebarToggle }) => {
  return (
    <button onClick={() => handleSidebarToggle()}>toggle drawer</button>
  );
};

export default SidebarController;
