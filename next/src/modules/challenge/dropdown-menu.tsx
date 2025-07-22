import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowsHorizontalIcon } from "@phosphor-icons/react/dist/ssr";
import UpdateChallengeDialog from "./update/dialog";
import DeleteChallengeDialog from "./delete/dialog";
import { useState } from "react";

export default function ChallengeDropdownMenu({
  challenge,
}: {
  challenge: ChallengeType;
}) {
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
          <ArrowsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <UpdateChallengeDialog challenge={challenge} />
        <DeleteChallengeDialog challenge={challenge} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
