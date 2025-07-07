import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import UpdateChallengeDialog from "./update/dialog";
import DeleteChallengeDialog from "./delete/dialog";
import { useState } from "react";

export default function ChallengeDropdownMenu() {
  const [open, setOpen] = useState(false);

  const toggleDialog = () => {
    console.log(`Toggling dropdown menu dialog [${!open ? "Open" : "Closed"}]`);
    setOpen(!open);
  };

  return (
    <DropdownMenu open={open} onOpenChange={toggleDialog}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <UpdateChallengeDialog />
        <DeleteChallengeDialog />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
