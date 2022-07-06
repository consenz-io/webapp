export interface IDataContext {
    globalIsItGood: boolean,
    globalIsRTL: boolean,
    toggleGlobalIsItGood?: () => void,
    toggleGlobalIsRTL?: () => void,
}

export type FCProps = {
  children: JSX.Element,
};
