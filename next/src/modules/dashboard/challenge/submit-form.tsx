import { Form } from "@/components/ui/form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useCreateRun } from "@/hooks/use-run/create";
import { useUpdateRun } from "@/hooks/use-run/update";

import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import InputFile from "@/components/form/input-file";
import { PaperPlaneTiltIcon } from "@phosphor-icons/react/dist/ssr";

const runFormSchema = z.object({
  file: z.instanceof(File),
});

export default function SubmissionForm({
  challengeId,
  run,
}: {
  challengeId: number;
  run?: RunType;
}) {
  const form = useForm<z.infer<typeof runFormSchema>>({
    resolver: zodResolver(runFormSchema),
    defaultValues: {
      file: new File([""], "", { type: "text/x-python" }),
    },
  });

  const session = useSession();

  const { mutate: create, isPending: isCreating } = useCreateRun();
  const { mutate: update, isPending: isUpdating } = useUpdateRun();

  async function onSubmit(values: z.infer<typeof runFormSchema>) {
    const file = values.file;
    console.log("Submitting file:", file);

    if (run && run.id) {
      update(
        {
          id: run.id,
          data: {
            file: file,
          },
        },
        {
          onSuccess: () => {
            toast.success(
              `Submissão para o Desafio #${challengeId} atualizada!`,
              {
                autoClose: 5000,
              }
            );
            form.reset();
          },
          onError: (error) => {
            toast.error(`Erro ao atualizar a submissão: ${error.message}`, {
              autoClose: 5000,
            });
            form.reset();
          },
        }
      );
    } else {
      create(
        {
          file: file,
          challengeId: challengeId,
        },
        {
          onSuccess: () => {
            toast.success(`Submissão para o Desafio #${challengeId} criada!`, {
              autoClose: 5000,
            });
            form.reset();
          },
          onError: (error) => {
            toast.error(`Erro ao criar a submissão: ${error.message}`, {
              autoClose: 5000,
            });
            form.reset();
          },
        }
      );
    }
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
          accept=".py"
          onChange={(e) => {
            const file = e.target.files?.[0];
            form.setValue(
              "file",
              file || new File([""], "", { type: "text/x-python" })
            );
          }}
        />
        <Button
          type="submit"
          className="cursor-pointer"
          disabled={isCreating || isUpdating}
        >
          <PaperPlaneTiltIcon className="mr-2 h-4 w-4" />
          {isCreating || isUpdating ? "Enviando..." : "Enviar Submissão"}
        </Button>
      </form>
    </Form>
  );
}
