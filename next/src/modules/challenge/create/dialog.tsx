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
import { PlusCircle } from "lucide-react";

export default function CreateChallengeDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
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
        <CreateChallengeForm />
      </DialogContent>
    </Dialog>
  );
}
