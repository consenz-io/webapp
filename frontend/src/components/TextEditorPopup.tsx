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
import { ReactComponent as ArrowIcon } from 'assets/icons/chevron-left.svg';
import { JSONContent } from '@tiptap/react';
import { FC, useContext, useState } from 'react';
import { inputBackgroundColor, secondaryDarkColor } from 'theme/theme';
import { StringBank } from 'strings';
import { useTranslation } from 'react-i18next';
import { isJsonContentEmpty } from 'utils/functions';
import { SettingsContext } from 'contexts';

interface DialogProps {
  isOpen: boolean;
  title?: string;
  newVersionName?: string;
  onCancel: () => void;
  onComplete: (content: JSONContent) => void;
  completeBtnText: string;
  cancelBtnText: string;
  editorPlaceholder?: string;
  initialContent?: JSONContent;
}

const TextEditorPopup: FC<DialogProps> = ({
  onCancel,
  onComplete,
  isOpen,
  initialContent,
  title,
  newVersionName,
  completeBtnText,
  cancelBtnText,
}) => {
  const { t } = useTranslation();
  const { isRTL } = useContext(SettingsContext);
  const [newTextContent, setNewTextContent] = useState(initialContent);

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
      onClose={onCancel}
    >
      <Stack gap={3}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" color={textSecondaryColor}>
            <Typography variant="h3" color={newVersionName ? undefined : 'text.primary'}>
              {title}
            </Typography>
            {newVersionName && (
              <>
                <ArrowIcon {...(isRTL && { transform: 'rotate(180)' })} />
                <Typography variant="h3" color="white">
                  {newVersionName}
                </Typography>
              </>
            )}
          </Stack>
          <IconButton edge="end" onClick={onCancel}>
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
            content={initialContent}
            placeholder={t(StringBank.INSERT_NEW_VERSION)}
            onChange={setNewTextContent}
          />
        </Box>
        <DialogActions sx={{ padding: 0 }}>
          <Button variant="contained" onClick={onCancel}>
            {cancelBtnText}
          </Button>
          <Button
            disabled={
              isJsonContentEmpty(newTextContent) ||
              JSON.stringify(initialContent) === JSON.stringify(newTextContent)
            }
            color="primary"
            variant="contained"
            onClick={() => onComplete(newTextContent ?? {})}
          >
            {completeBtnText}
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
};

export default TextEditorPopup;
