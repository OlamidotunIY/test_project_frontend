import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router";

interface props {
  id: string;
}

const ActionButton = ({ id }: props) => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"}>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" className="p-2">
        <DropdownMenuItem
          onClick={() => {
            navigate(`/users/${id}`);
          }}
        >
          View
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            navigate(`/users/${id}/edit`);
          }}
        >
          Edit
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionButton;
