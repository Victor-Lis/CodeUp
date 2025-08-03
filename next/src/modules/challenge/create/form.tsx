import { Form } from "@/components/ui/form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import InputFile from "@/components/form/input-file";
import { useCreateChallenge } from "@/hooks/use-challenge/create";
import { PaperPlaneTiltIcon } from "@phosphor-icons/react/dist/ssr";

const challengeFormSchema = z.object({
  file: z.instanceof(File),
});

type CreateChallengeFormProps = {
  onSuccess?: () => void;
};

export default function CreateChallengeForm({
  onSuccess,
}: CreateChallengeFormProps) {
  const form = useForm<z.infer<typeof challengeFormSchema>>({
    resolver: zodResolver(challengeFormSchema),
    defaultValues: {
      file: new File([""], "", { type: "application/pdf" }),
    },
  });

  const session = useSession();

  const { mutate: create, isPending: isCreating } = useCreateChallenge();

  async function onSubmit(values: z.infer<typeof challengeFormSchema>) {
    const file = values.file;

    create(
      {
        file,
      },
      {
        onSuccess: () => {
          toast.success(`Desafio enviado!\n`, {
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
            console.log("Selected file:", file);
            if (!file) {
              toast.error("Por favor, selecione um arquivo PDF.");
              return;
            }
            form.setValue(
              "file",
              file || new File([""], "", { type: "application/pdf" })
            );
          }}
        />
        <Button type="submit" className="cursor-pointer" disabled={isCreating}>
          <PaperPlaneTiltIcon className="mr-2 h-4 w-4" />
          {isCreating ? "Enviando..." : "Enviar Submissão"}
        </Button>
      </form>
    </Form>
  );
}
