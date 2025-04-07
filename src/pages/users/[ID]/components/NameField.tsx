import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldInputProps } from "formik";
import { Pencil, XCircle } from "lucide-react";
import React, { useState } from "react";

interface props extends FieldInputProps<string> {
  data: string;
  updateUserLoading: boolean;
}

export const NameField = ({ data, updateUserLoading, ...props }: props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
console.log(props)
  return (
    <div className="grid gap-2 bg-sky-100 rounded-md p-3">
      <div className="flex w-full justify-between">
        <Label htmlFor="email">Name</Label>
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
          <Input
            {...props}
            placeholder="john Deo"
          />
        ) : data ? (
          <span className="text-sm">{data}</span>
        ) : (
          <span className="italic text-sm text-muted-foreground">No name</span>
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
