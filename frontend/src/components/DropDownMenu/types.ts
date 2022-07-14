import * as React from "react";

type MenuItem = {
    name: string,
    color: string,
    slug: string
}

export interface IFCProps {
    name: string,
    buttonText: string
    menuItems: MenuItem[],
    endIcon: React.ReactNode,
    btnCapital?: string,
}
//TODO AVIRAN: Weird ts error in this file, what's the cause?
