import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteChallenge } from "@/hooks/use-challenge/delete";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { TrashSimpleIcon } from '@phosphor-icons/react/dist/ssr';
import { useState } from "react";

export default function DeleteChallengeDialog({
  challenge,
}: {
  challenge: ChallengeType;
}) {
  const [open, setOpen] = useState(false);

  const { mutate: deleteChallenge } = useDeleteChallenge();

  const handleConfirmDelete = () => {
    setOpen(false);
    deleteChallenge(challenge.id);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <TrashSimpleIcon className="h-5 w-5 text-red-400 cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Isso irá deletar permanentemente o
            desafio do servidor.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmDelete}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Sim, deletar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
