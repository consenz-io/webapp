export enum ThemeModeType {
    DARK = "DARK",
    LIGHT = "LIGHT",
}

export interface IOutletContext {
    sidebar: {
        open: boolean,
        setOpen: (open: boolean) => void,
    }
}
