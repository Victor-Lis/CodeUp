import {
  Form,
} from "@/components/ui/form";
import { Send } from "lucide-react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import fileUploadHandler from "@/lib/firebase/file";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import InputFile from "@/components/form/input-file";
import { useUpdateChallenge } from "@/hooks/use-challenge/update";

const runFormSchema = z.object({
  file: z.instanceof(File),
});

type UpdateChallengeFormProps = {
  challenge: ChallengeType;
  onSuccess?: () => void;
};

export default function UpdateChallengeForm({
  challenge,
  onSuccess,
}: UpdateChallengeFormProps) {
  const form = useForm<z.infer<typeof runFormSchema>>({
    resolver: zodResolver(runFormSchema),
    defaultValues: {
      file: new File([""], "", { type: "text/x-python" }),
    },
  });

  const session = useSession();

  const { mutate: update, isPending: isCreating } = useUpdateChallenge();

  async function onSubmit(values: z.infer<typeof runFormSchema>) {
    const file = values.file;

    const downloadURL = await fileUploadHandler(
      file,
      `challenges/${challenge.id}/`,
      `challenge-${challenge.id}` || "anonymous"
    );

    update(
      {
        id: challenge.id,
        data: {
          fileUrl: downloadURL,
        },
      },
      {
        onSuccess: () => {
          toast.success(`Desafio #${challenge.id} atualizado!\n`, {
            autoClose: 5000,
          });
          onSuccess?.();
        },
        onError: (error) => {
          console.error("Erro ao criar submissão:", error);
          toast.error("Erro ao criar submissão. Tente novamente.");
        },
      }
    );
    form.reset();
  }

  if (session.status === "loading") {
    return <div>Loading...</div>;
  }

  if (session.status === "unauthenticated") {
    return <div>Você precisa estar logado para submeter uma run.</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <InputFile
          control={form.control}
          name="file"
          accept=".pdf"
          onChange={(e) => {
            const file = e.target.files?.[0];
            form.setValue(
              "file",
              file || new File([""], "", { type: "text/x-python" })
            );
          }}
        />
        <Button type="submit" className="cursor-pointer" disabled={isCreating}>
          <Send className="mr-2 h-4 w-4" />
          {isCreating ? "Atualizando..." : "Atualizar Submissão"}
        </Button>
      </form>
    </Form>
  );
}
