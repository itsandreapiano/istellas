import * as React from "react";

import { useUploadThing } from "@/lib/uploadthing";

import { useToast } from "@/components/ui/use-toast";

export interface Attachment {
  file: File;
  mediaId?: string;
  isUploading: boolean;
}

export default function useMediaUpload() {
  const { toast } = useToast();

  const [attachments, setAttachments] = React.useState<Attachment[]>([]);

  const [uploadProgress, setUploadProgress] = React.useState<number>();

  const { startUpload, isUploading } = useUploadThing("attachment", {
    onBeforeUploadBegin(files) {
      const renamedFiles = files.map((file) => {
        const extension = file.name.split(".").pop();
        return new File(
          [file],
          `attachment_${crypto.randomUUID()}.${extension}`,
          {
            type: file.type,
          },
        );
      });

      setAttachments((prev) => [
        ...prev,
        ...renamedFiles.map((file) => ({ file, isUploading: true })),
      ]);

      return renamedFiles;
    },
    onUploadProgress: setUploadProgress,
    onClientUploadComplete(result) {
      setAttachments((prev) =>
        prev.map((attachment) => {
          const uploadResult = result.find(
            (res) => res.name === attachment.file.name,
          );

          if (!uploadResult) return attachment;

          return {
            ...attachment,
            mediaId: uploadResult.serverData.mediaId,
            isUploading: false,
          };
        }),
      );
    },
    onUploadError(e) {
      const customMessage =
        e.message === "Invalid config: FileSizeMismatch"
          ? // To be fixed for videos, as they don't play properly once uploaded
            // "File size exceeds the limit! Please upload an image under 8MB or a video under 64MB."

            "File size exceeds the limit! Please upload an image under 8MB."
          : e.message === "Invalid config: InvalidFileType"
            ? "Invalid file type! Please upload a supported image."
            : e.message;
      setAttachments((prev) =>
        prev.filter((attachment) => !attachment.isUploading),
      );

      toast({
        variant: "destructive",
        description: customMessage,
      });
    },
  });

  function handleStartUpload(files: File[]) {
    if (isUploading) {
      toast({
        variant: "destructive",
        description: "Please wait for the current upload to finish.",
      });
      return;
    }

    if (attachments.length + files.length > 5) {
      toast({
        variant: "destructive",
        description: "You can only upload up to 5 attachments per post.",
      });
      return;
    }

    startUpload(files);
  }

  function removeAttachment(fileName: string) {
    setAttachments((prev) =>
      prev.filter((attachment) => attachment.file.name !== fileName),
    );
  }

  function reset() {
    setAttachments([]);
    setUploadProgress(undefined);
  }

  return {
    startUpload: handleStartUpload,
    attachments,
    isUploading,
    uploadProgress,
    removeAttachment,
    reset,
  };
}
