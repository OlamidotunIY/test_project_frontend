import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, XCircle } from "lucide-react";
import React, { useState } from "react";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  bio: string;
  updateUserLoading: boolean;
}

export const BioField = ({ bio, updateUserLoading, ...props }: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  console.log(props);
  return (
    <div className="grid gap-2 bg-sky-100 rounded-md p-3">
      <div className="flex w-full justify-between">
        <Label htmlFor="bio">Bio</Label>
        <Button
          variant={"ghost"}
          type="button"
          className="p-0"
          onClick={() => {
            setIsEditing(!isEditing);
          }}
        >
          {isEditing ? "Cancel" : "Edit"}
          {isEditing ? <XCircle size={16} /> : <Pencil size={16} />}
        </Button>
      </div>
      <div className="bg-slate-50 p-2 rounded-lg">
        {isEditing ? (
          <Textarea {...props} />
        ) : bio ? (
            <span className="text-sm">{bio}</span>
          ) : (
            <span className="italic text-sm text-muted-foreground">No bio available</span>
          )}
      </div>
      {isEditing && (
        <Button className="w-1/3 justify-self-end" type="submit" disabled={updateUserLoading}>
          Save
        </Button>
      )}
    </div>
  );
};
