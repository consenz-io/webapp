import * as React from "react";

export type MenuItem = {
    text: string,
    color: string,
    action?: () => void,
}

export interface IFCProps {
    name: string,
    buttonText: string
    menuItems: MenuItem[],
    endIcon: React.ReactNode,
    btnCapital?: string,
    isBorderHidden?: boolean,
}
//TODO AVIRAN: Weird ts error in this file, what's the cause?
