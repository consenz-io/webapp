export default interface DialogProps {
  title: string;
  content: string;
  openDialogState: boolean;
  cancleFunction: () => void;
  finishFunction: (val: string) => void;
  closeBtnText: string;
  doneBtnText: string;
  placeHolderText: string;
}
