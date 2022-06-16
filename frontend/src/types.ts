export enum ThemeModeType {
    DARK = "DARK",
    LIGHT = "LIGHT",
}

export interface IOutletContext {
    sidebar: {
        handleSidebarToggle: () => void,
    }
}
