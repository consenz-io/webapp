export interface IDataContext {
    globalIsItGood: boolean,
    toggleGlobalIsItGood?: () => void,
}

export type FCProps = {
  children: JSX.Element,
};