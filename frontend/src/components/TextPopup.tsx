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
import { useTranslation } from 'react-i18next';
import { StringBank } from 'strings';
import { JSONContent } from '@tiptap/react';
import { useState } from 'react';

interface dialogProps {
  isOpen: boolean;
  parentSection: string;
  newVersionName: string;
  cancleFn: (val: boolean) => unknown;
  completeFn: any;
  completeBtnText: string;
  cancleBtnText: string;
  variabels?: any;
}

const TextPopup = (props: dialogProps) => {
  const { t } = useTranslation();
  const [newVersionContent, setNewVersion] = useState<JSONContent>();
  const {
    cancleFn,
    completeFn,
    isOpen,
    parentSection,
    newVersionName,
    completeBtnText,
    cancleBtnText,
  } = props;

  const checkContent = () => {
    console.log('newVersionContent', newVersionContent);
    if (
      newVersionContent &&
      newVersionContent.content &&
      'content' in newVersionContent.content[0]
    ) {
      return false;
    }
    return true;
  };

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
        cancleFn(false);
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
                cancleFn(false);
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
            initialContent={newVersionContent}
            placeholder={t(StringBank.INSERT_NEW_VERSION)}
            onChange={(newValue: JSONContent) => {
              setNewVersion(newValue);
            }}
          ></ContentEditor>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              cancleFn(false);
            }}
          >
            {cancleBtnText}
          </Button>
          <Button
            disabled={checkContent()}
            color="primary"
            variant="contained"
            onClick={() => {
              completeFn({
                variables: { sectionId: props.variabels.sectionId, content: newVersionContent },
              });
              setNewVersion(undefined);
              cancleFn(false);
              return;
            }}
          >
            {completeBtnText}
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
};

export default TextPopup;
