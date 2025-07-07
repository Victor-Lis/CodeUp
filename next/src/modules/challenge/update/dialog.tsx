import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Pencil } from "lucide-react";
import UpdateChallengeForm from "./form";
import { useState } from "react";

export default function UpdateChallengeDialog({
  challenge,
}: {
  challenge: ChallengeType;
}) {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Pencil className="h-5 w-5 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Atualizar Desafio</DialogTitle>
          <DialogDescription>
            Preencha os detalhes para atualizar o desafio.
          </DialogDescription>
        </DialogHeader>
        <UpdateChallengeForm challenge={challenge} onSuccess={toggleOpen} />
      </DialogContent>
    </Dialog>
  );
}
