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
import { Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import UpdateChallengeForm from "@/modules/challenge/update/form";
import UpdateTestCaseForm from "./form";

export default function UpdateTestCaseDialog({
  testCase,
}: {
  testCase: TestCaseType;
}) {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil className="h-5 w-5 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Atualizar Teste</DialogTitle>
          <DialogDescription>
            Preencha os detalhes para atualizar o teste.
          </DialogDescription>
        </DialogHeader>
        <UpdateTestCaseForm testCase={testCase} onSuccess={toggleOpen} />
      </DialogContent>
    </Dialog>
  );
}
