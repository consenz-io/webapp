import { FC } from "react";
import { IFCProps } from "./types";

const SidebarController:FC<IFCProps>= ({ open, onOpenChange }) => {
  return (
    <button onClick={() => onOpenChange(!open)}>toggle drawer</button>
  );
};

export default SidebarController;
