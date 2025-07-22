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
import { PlusCircleIcon } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";

export default function CreateTestCaseDialog() {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <Dialog open={open} onOpenChange={toggleOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Adicionar Teste
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo Teste</DialogTitle>
          <DialogDescription>
            Preencha os detalhes para criar um novo teste.
          </DialogDescription>
        </DialogHeader>
        <CreateChallengeForm onSuccess={toggleOpen} />
      </DialogContent>
    </Dialog>
  );
}
