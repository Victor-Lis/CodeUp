import {
  Form
} from "@/components/ui/form";
import { Send } from "lucide-react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useGetChallenges } from "@/hooks/use-challenge/get-all";
import InputTextArea from "@/components/form/input-textarea";
import { useCreateTestCase } from "@/hooks/use-test-case/create";
import { useParams } from "next/navigation";

const testCaseFormSchema = z.object({
  input: z.string()
    .min(2, { message: "Entrada deve ter entre 2 e 10000 caracteres." })
    .max(10000, { message: "Entrada deve ter entre 2 e 10000 caracteres." }),
  expectedOutput: z.string()
    .min(2, { message: "Saída esperada deve ter entre 2 e 10000 caracteres." })
    .max(10000, { message: "Saída esperada deve ter entre 2 e 10000 caracteres." }),
});

type CreateTestCaseFormProps = {
  onSuccess?: () => void;
}

export default function CreateTestCaseForm({ onSuccess }: CreateTestCaseFormProps) {
  const challengeId = useParams().challengeId
    ? parseInt(useParams().challengeId as string, 10)
    : 0;

  const form = useForm<z.infer<typeof testCaseFormSchema>>({
    resolver: zodResolver(testCaseFormSchema),
    defaultValues: {
      input: "",
      expectedOutput: "",
    },
  });

  const session = useSession();

  const { mutate: create, isPending: isCreating } = useCreateTestCase();

  async function onSubmit(values: z.infer<typeof testCaseFormSchema>) {
    create(
      {
        input: values.input,
        expectedOutput: values.expectedOutput,
        challengeId,
      },
      {
        onSuccess: () => {
          toast.success(`Teste criado com sucesso!\n`, {
            autoClose: 5000,
          });
          onSuccess?.();
        },
        onError: (error) => {
          console.error("Erro ao criar teste:", error);
          toast.error("Erro ao criar teste. Tente novamente.");
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

  if (!challengeId) {
    return <div>Desafio não encontrado.</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <InputTextArea
          control={form.control}
          name="input"
          label="Entrada"
        />
        <InputTextArea
          control={form.control}
          name="expectedOutput"
          label="Saída Esperada"
        />
        <Button type="submit" className="cursor-pointer" disabled={isCreating}>
          <Send className="mr-2 h-4 w-4" />
          {isCreating ? "Enviando..." : "Enviar Submissão"}
        </Button>
      </form>
    </Form>
  );
}
