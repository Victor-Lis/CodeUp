import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useState } from "react";
import UpdateTestCaseForm from "./form";
import { PenIcon } from "@phosphor-icons/react/dist/ssr";

export default function UpdateTestCaseDialog({
  testCase,
}: {
  testCase: TestCaseType;
}) {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <Dialog open={open} onOpenChange={toggleOpen}>
      <DialogTrigger asChild>
        <PenIcon className="h-5 w-5 cursor-pointer" />
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
