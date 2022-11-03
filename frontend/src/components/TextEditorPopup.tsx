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
import { useTranslation } from 'react-i18next';
import { StringBank } from 'strings';
import { JSONContent } from '@tiptap/react';
import { useState } from 'react';

interface DialogProps {
  isOpen: boolean;
  parentSection: string;
  newVersionName: string;
  onCancel: (val: boolean) => unknown;
  onComplete: (...args: any[]) => unknown;
  completeBtnText: string;
  cancelBtnText: string;
  variabels?: Record<string, unknown>;
  initialContent: JSONContent | undefined;
}

const TextEditorPopup = (props: DialogProps) => {
  const { t } = useTranslation();
  const [newTextContent, setnewTextContent] = useState<JSONContent | undefined>(
    props.initialContent
  );
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
    onComplete({ variables: { ...props.variabels, content: newTextContent } });
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
            <Typography variant="h3">{parentSection}</Typography>
            <Typography>
              <ArrowLogo />
            </Typography>
            <Typography variant="h3" color="white">
              {newVersionName}
            </Typography>
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
        <Box
          sx={{
            border: 'solid 1px#565d68',
            borderRadius: '4px',
            backgroundColor: 'rgba(0,0,0,0.08)',
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
          >
            {completeBtnText}
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
};

export default TextEditorPopup;
