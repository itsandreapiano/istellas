import { CommentData } from "@/lib/types";

import * as React from "react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import DeleteCommentDialog from "./DeleteCommentDialog";

import { MoreVertical, Trash2 } from "lucide-react";

interface CommentMoreButtonProps {
  comment: CommentData;
  className?: string;
}

const CommentMoreButton = ({ comment, className }: CommentMoreButtonProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className={cn("size-9", className)}
          >
            <MoreVertical className="size-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-10 mt-[-8px] shadow-[0_5px_15px_rgba(0,0,0,0.25)]">
          <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
            <span className="flex items-center gap-2 px-1 py-1 text-foreground">
              <Trash2 className="size-4" />
              Delete comment
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteCommentDialog
        comment={comment}
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      />
    </>
  );
};

export default CommentMoreButton;
