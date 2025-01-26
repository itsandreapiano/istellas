import { CommentData } from "@/lib/types";

import { useDeleteCommentMutation } from "./mutations";

import LoadingButton from "../LoadingButton";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface DeleteCommentDialogProps {
  comment: CommentData;
  open: boolean;
  onClose: () => void;
}

const DeleteCommentDialog = ({
  comment,
  open,
  onClose,
}: DeleteCommentDialogProps) => {
  const mutation = useDeleteCommentMutation();

  const handleOpenChange = (open: boolean) => {
    if (!open || !mutation.isPending) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete comment?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this comment?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 sm:flex-row">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={mutation.isPending}
          >
            Cancel
          </Button>
          <LoadingButton
            variant="destructive"
            onClick={() => mutation.mutate(comment.id, { onSuccess: onClose })}
            loading={mutation.isPending}
          >
            Delete
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCommentDialog;
