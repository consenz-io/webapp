import {
  Box,
  Button,
  Dialog,
  DialogActions,
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
import { inputBackgroundColor, secondaryDarkColor } from 'theme/theme';
import { StringBank } from 'strings';
import { useTranslation } from 'react-i18next';

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
  initialContent?: JSONContent;
}

const TextEditorPopup = (props: DialogProps) => {
  const { t } = useTranslation();
  const [newTextContent, setnewTextContent] = useState(props.initialContent);
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

  return (
    <Dialog
      disablePortal
      closeAfterTransition
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          backgroundColor: secondaryDarkColor,
          borderRadius: '8px',
          backgroundImage: 'none',
          padding: 4,
        },
      }}
      open={isOpen}
      onClose={() => {
        onCancel(false);
      }}
    >
      <Stack spacing={3}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" color={textSecondaryColor}>
            <Typography variant="h3" color={newVersionName ? undefined : 'text.primary'}>
              {parentSection}
            </Typography>
            {newVersionName && (
              <>
                <ArrowLogo />
                <Typography variant="h3" color="white">
                  {newVersionName}
                </Typography>
              </>
            )}
          </Stack>
          <IconButton edge="end" onClick={() => onCancel(false)}>
            <SvgIcon htmlColor={textSecondaryColor}>
              <Xbtn />
            </SvgIcon>
          </IconButton>
        </Stack>
        <Box
          sx={{
            border: 'solid 1px #565d68',
            borderRadius: '4px',
            backgroundColor: inputBackgroundColor,
          }}
          paddingX={2}
        >
          <ContentEditor
            content={newTextContent}
            placeholder={t(StringBank.INSERT_NEW_VERSION)}
            onChange={(newValue: JSONContent) => {
              setnewTextContent(newValue);
            }}
          ></ContentEditor>
        </Box>
        <DialogActions sx={{ padding: 0 }}>
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
          >
            {completeBtnText}
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
};

export default TextEditorPopup;
