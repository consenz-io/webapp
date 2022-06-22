import * as React from "react";

type MenuItem = {
    text: string,
    color: string,
}

type AnchorEl = EventTarget | null;

export interface IFCProps {
    name: string,
    buttonText: string
    menuItems: MenuItem[],
    anchorEl: AnchorEl,
    setAnchorEl: (el: AnchorEl) => void,
    endIcon: React.ReactNode,
    btnCapital?: string,
}
