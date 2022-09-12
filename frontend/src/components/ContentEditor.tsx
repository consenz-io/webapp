import { useEditor, EditorContent, BubbleMenu, JSONContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import { Divider, ToggleButton, ToggleButtonGroup } from '@mui/material';
import {
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
} from '@mui/icons-material';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';

interface IProps {
  initialContent?: JSONContent;
  placeholder?: string;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onChange?: (value: JSONContent) => void;
  readonly?: boolean;
}

function ContentEditor({
  placeholder,
  onKeyDown,
  onChange,
  initialContent,
  readonly,
  ...dataAttributes
}: IProps): JSX.Element {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ autolink: true, linkOnPaste: true, openOnClick: true }),
      Placeholder.configure({ placeholder }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      ListItem,
      BulletList,
      OrderedList,
    ],
    content: initialContent,
    editable: !readonly,
  });
  editor?.on('update', ({ editor }) => {
    onChange?.(editor.getJSON());
  });

  return (
    <div {...dataAttributes}>
      {editor && (
        <BubbleMenu editor={editor}>
          <ToggleButtonGroup sx={{ bgcolor: (theme) => theme.palette.common.white }} size="small">
            <ToggleButton
              value="bold"
              onClick={() => editor.chain().focus().toggleBold().run()}
              selected={editor.isActive('bold')}
              color="secondary"
              sx={{ borderRadius: 1 }}
            >
              <FormatBold color="secondary" />
            </ToggleButton>
            <ToggleButton
              value="italic"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              selected={editor.isActive('italic')}
              color="secondary"
              sx={{ borderRadius: 1 }}
            >
              <FormatItalic color="secondary" />
            </ToggleButton>
            <ToggleButton
              value="underline"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              selected={editor.isActive('underline')}
              color="secondary"
              sx={{ borderRadius: 1 }}
            >
              <FormatUnderlined color="secondary" />
            </ToggleButton>
            <Divider orientation="vertical" flexItem />
            <ToggleButton
              value="left"
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              color="secondary"
              sx={{ borderRadius: 1 }}
              selected={editor.isActive({ textAlign: 'left' })}
            >
              <FormatAlignLeft color="secondary" />
            </ToggleButton>
            <ToggleButton
              value="center"
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              color="secondary"
              sx={{ borderRadius: 1 }}
              selected={editor.isActive({ textAlign: 'center' })}
            >
              <FormatAlignCenter color="secondary" />
            </ToggleButton>
            <ToggleButton
              value="right"
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              color="secondary"
              sx={{ borderRadius: 1 }}
              selected={editor.isActive({ textAlign: 'right' })}
            >
              <FormatAlignRight color="secondary" />
            </ToggleButton>
            <Divider orientation="vertical" flexItem />
            <ToggleButton
              value="bulleted"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              color="secondary"
              sx={{ borderRadius: 1 }}
              selected={editor.isActive('bulletList')}
            >
              <FormatListBulleted color="secondary" />
            </ToggleButton>
            <ToggleButton
              value="numbered"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              color="secondary"
              sx={{ borderRadius: 1 }}
              selected={editor.isActive('orderedList')}
            >
              <FormatListNumbered color="secondary" />
            </ToggleButton>
          </ToggleButtonGroup>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} onKeyDown={onKeyDown} />
    </div>
  );
}

export default ContentEditor;
