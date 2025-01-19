"use client";

import * as React from "react";

import { UserData } from "@/lib/types";

import { Button } from "@/components/ui/button";
import EditProfileDialog from "./EditProfileDialog";

import { Pencil } from "lucide-react";

interface EditProfileButtonProps {
  user: UserData;
}

const EditProfileButton = ({ user }: EditProfileButtonProps) => {
  const [showDialog, setShowDialog] = React.useState(false);

  return (
    <>
      <Button
        className="secondary-btn-bg hover:secondary-btn-bghover text-foreground"
        onClick={() => setShowDialog(true)}
      >
        <Pencil size="14" className="mr-2" />
        Edit profile
      </Button>
      <EditProfileDialog
        user={user}
        open={showDialog}
        onOpenChange={setShowDialog}
      />
    </>
  );
};

export default EditProfileButton;
