import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import ContentEditor from './ContentEditor';
import { textSecondaryColor } from 'theme';
import { ReactComponent as Xbtn } from 'assets/icons/x-circle.svg';
import { ReactComponent as ArrowLogo } from 'assets/icons/chevron-down.svg';
import { JSONContent } from '@tiptap/react';
import { useState } from 'react';

interface DialogProps {
  isOpen: boolean;
  parentSection?: string;
  newVersionName?: string;
  onCancel: (val: boolean) => unknown;
  onComplete: (...args: any[]) => unknown;
  completeBtnText: string;
  cancelBtnText: string;
  variabels?: Record<string, unknown>;
  editorPlaceholder?: string;
}

const TextEditorPopup = (props: DialogProps) => {
  const [newTextContent, setnewTextContent] = useState<JSONContent>();
  const {
    onCancel,
    onComplete,
    isOpen,
    parentSection,
    newVersionName,
    completeBtnText,
    cancelBtnText,
  } = props;

  const checkContent = () => {
    if (newTextContent && newTextContent.content && 'content' in newTextContent.content[0]) {
      return false;
    }
    return true;
  };

  function handleCompleteClick() {
    if (props.variabels) {
      onComplete({ variables: { ...props.variabels, content: newTextContent } });
    } else {
      onComplete({ variables: { content: newTextContent } });
    }
    setnewTextContent(undefined);
    onCancel(false);
    return;
  }

  function loadTitle() {
    if (!newVersionName) {
      return (
        <Typography variant="h3" color="white">
          {parentSection}
        </Typography>
      );
    }
    return (
      <>
        <Typography variant="h3">{parentSection}</Typography>
        <Typography>
          <ArrowLogo />
        </Typography>
        <Typography variant="h3" color="white">
          {newVersionName}
        </Typography>
      </>
    );
  }

  return (
    <Dialog
      disablePortal={true}
      closeAfterTransition={true}
      fullWidth={true}
      maxWidth="md"
      PaperProps={{
        sx: {
          backgroundColor: '#3f4550',
          borderRadius: '8px',
          backgroundImage: 'none',
          padding: 2,
        },
      }}
      open={isOpen}
      onClose={() => {
        onCancel(false);
      }}
    >
      <Stack direction="column" spacing={1}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" color={textSecondaryColor}>
            {loadTitle()}
          </Stack>
          <Stack direction="row">
            <IconButton
              edge="end"
              onClick={() => {
                onCancel(false);
              }}
            >
              <SvgIcon htmlColor={textSecondaryColor}>
                <Xbtn />
              </SvgIcon>
            </IconButton>
          </Stack>
        </Stack>
        <DialogContent
          sx={{
            border: 'solid 1px#565d68',
            borderRadius: '4px',
            backgroundColor: 'rgba(0,0,0,0.08)',
          }}
        >
          <ContentEditor
            initialContent={newTextContent}
            placeholder={props.editorPlaceholder}
            onChange={(newValue: JSONContent) => {
              setnewTextContent(newValue);
            }}
          ></ContentEditor>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              onCancel(false);
            }}
          >
            {cancelBtnText}
          </Button>
          <Button
            disabled={checkContent()}
            color="primary"
            variant="contained"
            onClick={handleCompleteClick}
            sx={{ height: '2rem' }}
          >
            {completeBtnText}
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
};

export default TextEditorPopup;
