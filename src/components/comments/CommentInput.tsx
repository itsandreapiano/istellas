import { PostData } from "@/lib/types";

import * as React from "react";

import { useSubmitCommentMutation } from "./mutations";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { Loader2, SendHorizonal } from "lucide-react";

interface CommentInputProps {
  post: PostData;
}

const CommentInput = ({ post }: CommentInputProps) => {
  const [input, setInput] = React.useState("");

  const mutation = useSubmitCommentMutation(post.id);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!input) return;

    mutation.mutate(
      {
        post,
        content: input,
      },
      {
        onSuccess: () => setInput(""),
      },
    );
  }

  return (
    <form className="flex w-full items-center gap-2" onSubmit={onSubmit}>
      <Input
        placeholder="Write a comment..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
      />
      {!mutation.isPending ? (
        <Button
          type="submit"
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
    </form>
  );
};

export default CommentInput;
