import {
  useEditor,
  EditorContent,
  BubbleMenu,
  JSONContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
} from "@mui/icons-material";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";

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
    ],
    content: initialContent,
    editable: !readonly,
  });
  editor?.on("update", ({ editor }) => {
    onChange?.(editor.getJSON());
  });

  return (
    <div {...dataAttributes}>
      {editor && (
        <BubbleMenu editor={editor}>
          <ToggleButtonGroup
            sx={{
              bgcolor: (theme) => theme.palette.background.default,
              padding: 0.5,
            }}
            size="small"
          >
            <ToggleButton
              value="bold"
              onClick={() => editor.chain().focus().toggleBold().run()}
              selected={editor.isActive("bold")}
            >
              <FormatBold />
            </ToggleButton>
            <ToggleButton
              value="italic"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              selected={editor.isActive("italic")}
            >
              <FormatItalic />
            </ToggleButton>
            <ToggleButton
              value="underline"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              selected={editor.isActive("underline")}
            >
              <FormatUnderlined />
            </ToggleButton>
          </ToggleButtonGroup>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} onKeyDown={onKeyDown} />
    </div>
  );
}

export default ContentEditor;
