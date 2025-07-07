import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateChallengeForm from "./form";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Pencil } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

export default function UpdateChallengeDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil className="h-5 w-5 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo Desafio</DialogTitle>
          <DialogDescription>
            Preencha os detalhes para criar um novo desafio.
          </DialogDescription>
        </DialogHeader>
        {/* <CreateChallengeForm /> */}
      </DialogContent>
    </Dialog>
  );
}
