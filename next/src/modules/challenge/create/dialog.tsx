import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateChallengeForm from "./form";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PlusCircleIcon } from "@phosphor-icons/react/dist/ssr";

export default function CreateChallengeDialog() {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Adicionar Novo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo Desafio</DialogTitle>
          <DialogDescription>
            Preencha os detalhes para criar um novo desafio.
          </DialogDescription>
        </DialogHeader>
        <CreateChallengeForm onSuccess={toggleOpen} />
      </DialogContent>
    </Dialog>
  );
}
