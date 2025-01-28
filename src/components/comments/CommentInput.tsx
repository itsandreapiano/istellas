import { PostData } from "@/lib/types";

import * as React from "react";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

import { useSubmitCommentMutation } from "./mutations";

import { Button } from "../ui/button";

import { Loader2, SendHorizonal } from "lucide-react";

interface CommentInputProps {
  post: PostData;
}

const CommentInput = ({ post }: CommentInputProps) => {
  const mutation = useSubmitCommentMutation(post.id);

  const [isFocused, setIsFocused] = React.useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "Write a comment...",
      }),
    ],
    autofocus: true,
  });

  React.useEffect(() => {
    if (editor) {
      editor.commands.focus();
    }
  }, [editor]);

  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input) return;

    mutation.mutate(
      {
        post,
        content: input,
      },
      {
        onSuccess: () => editor?.commands.clearContent(),
      },
    );
  };

  return (
    <div className="flex w-full items-center gap-2">
      <div className="w-full overflow-hidden">
        <EditorContent
          editor={editor}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`post-editor text-md max-h-56 w-full overflow-y-auto rounded-2xl border-2 border-transparent bg-background px-5 py-3 ring-offset-background ${
            isFocused ? "mobile:!border-primary" : ""
          }`}
        />
      </div>
      {!mutation.isPending ? (
        <Button
          type="button"
          onClick={onSubmit}
          variant="ghost"
          size="icon"
          disabled={!input.trim()}
        >
          <SendHorizonal />
        </Button>
      ) : (
        <Button
          type="button"
          variant="loader"
          size="icon"
          className="flex items-center justify-center"
        >
          <Loader2 className="animate-spin text-foreground" />
        </Button>
      )}
    </div>
  );
};

export default CommentInput;
