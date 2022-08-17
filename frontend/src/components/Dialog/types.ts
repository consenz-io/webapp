export default interface DialogProps {
  title: string;
  content: string;
  openDialogState: boolean;
  cancleFunction: () => void;
  finishFunction: (val: string) => void;
  cancleBtnText: string;
  finishBtnText: string;
  placeHolderText: string;
  doneBtnColor?:
    | 'primary'
    | 'inherit'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | undefined;
  doneBtnVariant?: 'text' | 'contained' | 'outlined' | 'delete' | undefined;
}
