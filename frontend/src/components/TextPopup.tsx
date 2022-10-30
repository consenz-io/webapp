import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
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
  completeFn: () => unknown;
  completeBtnText: string;
  cancleBtnText: string;
}

const TextPopup = (props: dialogProps) => {
  const { t } = useTranslation();
  const [newVersionContent, setNewVersion] = useState('');
  console.log('setNewVersion', setNewVersion);
  const {
    cancleFn,
    completeFn,
    isOpen,
    parentSection,
    newVersionName,
    completeBtnText,
    cancleBtnText,
  } = props;

  //   const handleContentChange = (contentValue: string) => {
  //     setNewVersion(contentValue);
  //   };

  return (
    <Dialog
      disablePortal={true}
      closeAfterTransition={true}
      PaperProps={{
        sx: {
          width: '70%',
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
      <Stack direction="column" spacing={2}>
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
            <SvgIcon fontSize="small">
              <Xbtn />
            </SvgIcon>
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
            onChange={(content: JSONContent) => {
              console.log('content', content);
              //   const data: string = content!.content![0].content![0].text;
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
          <Button color="primary" variant="contained" onClick={completeFn}>
            {completeBtnText}
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
};

export default TextPopup;
