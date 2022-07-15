import * as React from "react";

export type MenuItem = {
    name?: string;
    text?: string,
    color: string,
    slug?: string,
    action?: () => void,
}

export interface IFCProps {
    name: string,
    buttonText: string
    menuItems: MenuItem[] | undefined | null,
    endIcon: React.ReactNode,
    btnCapital?: string,
    isBorderHidden?: boolean,
}
