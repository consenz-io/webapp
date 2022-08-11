export default interface DialogProps {
  title: string;
  content: string;
  openDialogState: boolean;
  closeFunction: () => void;
  createFunction: () => void;
  closeBtnText: string;
  doneBtnText: string;
}
