export default interface DialogProps {
  title: string;
  content: string;
  openDialogState: boolean;
  closeFunction: () => void;
  createFunction: (val: string) => void;
  closeBtnText: string;
  doneBtnText: string;
}
