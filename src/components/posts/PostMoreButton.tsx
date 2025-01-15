import { PostData } from "@/lib/types";

import * as React from "react";

import { MoreHorizontal, Trash2 } from "lucide-react";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import DeletePostDialog from "./DeletePostDialog";

interface PostMoreButtonProps {
  post: PostData;
}

const PostMoreButton = ({ post }: PostMoreButtonProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <MoreHorizontal className="size-5 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="relative bottom-2 right-12 shadow-[0_5px_15px_rgba(0,0,0,0.25)]">
          <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
            <span className="flex items-center gap-2 px-1 py-1 text-foreground">
              <Trash2 className="size-4" />
              Delete post
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeletePostDialog
        post={post}
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      />
    </>
  );
};

export default PostMoreButton;
