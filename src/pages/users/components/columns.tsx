import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { user } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import ActionButton from "./actionButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const columns: ColumnDef<user>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const profilePicture = row.original.profilePicture;
      const email = row.original.email;
      const name = row.original.name;
      return (
        <div className="flex items-center space-x-2">
          <div>
            <Avatar className="h-10 w-10 rounded-lg">
              <AvatarImage src={profilePicture} alt={name} />
              <AvatarFallback className="uppercase rounded-lg">
                {name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col">
            <span className="capitalize">{name}</span>
            <span className="text-xs text-muted-foreground">{email}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "bio",
    header: "Bio",
    cell: ({ row }) => (
      <div className="flex-1 min-w-[250px] md:max-w-[350px] max-w-[250px]">
        {row.original.bio ? (
          <span className="truncate w-full block whitespace-nowrap overflow-hidden text-ellipsis">
            {row.original.bio}{" "}
          </span>
        ) : (
          <span className="text-muted-foreground">No bio available</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleDateString(),
  },
  {
    id: "action",
    cell: ({ row }) => <ActionButton id={row.original.id} />,
  },
];
