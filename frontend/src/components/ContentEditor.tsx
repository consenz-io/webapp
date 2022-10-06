import { useEditor, EditorContent, BubbleMenu, JSONContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import {
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
  TableChart,
  InsertLink,
} from '@mui/icons-material';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { backgroundBorderColor } from 'theme';

interface IProps {
  initialContent?: JSONContent | string;
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
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
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
            >
              <FormatBold color="secondary" />
            </ToggleButton>
            <ToggleButton
              value="italic"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              selected={editor.isActive('italic')}
              color="secondary"
            >
              <FormatItalic color="secondary" />
            </ToggleButton>
            <ToggleButton
              value="underline"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              selected={editor.isActive('underline')}
              color="secondary"
              sx={{ borderInlineEnd: `1px solid ${backgroundBorderColor}` }}
            >
              <FormatUnderlined color="secondary" />
            </ToggleButton>
            <ToggleButton
              value="left"
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              color="secondary"
              selected={editor.isActive({ textAlign: 'left' })}
            >
              <FormatAlignLeft color="secondary" />
            </ToggleButton>
            <ToggleButton
              value="center"
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              color="secondary"
              selected={editor.isActive({ textAlign: 'center' })}
            >
              <FormatAlignCenter color="secondary" />
            </ToggleButton>
            <ToggleButton
              value="right"
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              color="secondary"
              sx={{ borderInlineEnd: `1px solid ${backgroundBorderColor}` }}
              selected={editor.isActive({ textAlign: 'right' })}
            >
              <FormatAlignRight color="secondary" />
            </ToggleButton>
            <ToggleButton
              value="bulleted"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              color="secondary"
              selected={editor.isActive('bulletList')}
            >
              <FormatListBulleted color="secondary" />
            </ToggleButton>
            <ToggleButton
              value="numbered"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              color="secondary"
              selected={editor.isActive('orderedList')}
              sx={{ borderInlineEnd: `1px solid ${backgroundBorderColor}` }}
            >
              <FormatListNumbered color="secondary" />
            </ToggleButton>
            <ToggleButton
              value="hyperlink"
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .toggleLink({
                    href: editor.state.doc.cut(
                      editor.view.state.selection.from,
                      editor.view.state.selection.to
                    ).textContent,
                  })
                  .run()
              }
              color="secondary"
              selected={editor.isActive('link')}
            >
              <InsertLink color="secondary" />
            </ToggleButton>
            <ToggleButton
              value="table"
              onClick={() => editor.chain().focus().insertTable({ rows: 1, cols: 2 }).run()}
              color="secondary"
            >
              <TableChart color="secondary" />
            </ToggleButton>
          </ToggleButtonGroup>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} onKeyDown={onKeyDown} />
    </div>
  );
}

export default ContentEditor;
