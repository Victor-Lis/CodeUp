import {
  Form
} from "@/components/ui/form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import InputTextArea from "@/components/form/input-textarea";
import { useParams } from "next/navigation";
import { useUpdateTestCase } from "@/hooks/use-test-case/update";
import { PaperPlaneTiltIcon } from "@phosphor-icons/react/dist/ssr";

const testCaseFormSchema = z.object({
  input: z.string()
    .min(2, { message: "Entrada deve ter entre 2 e 10000 caracteres." })
    .max(10000, { message: "Entrada deve ter entre 2 e 10000 caracteres." }),
  expectedOutput: z.string()
    .min(2, { message: "Saída esperada deve ter entre 2 e 10000 caracteres." })
    .max(10000, { message: "Saída esperada deve ter entre 2 e 10000 caracteres." }),
});

type UpdateTestCaseFormProps = {
  testCase: TestCaseType;
  onSuccess?: () => void;
}

export default function UpdateTestCaseForm({ testCase, onSuccess }: UpdateTestCaseFormProps) {
  const challengeId = useParams().challengeId
    ? parseInt(useParams().challengeId as string, 10)
    : 0;

  const form = useForm<z.infer<typeof testCaseFormSchema>>({
    resolver: zodResolver(testCaseFormSchema),
    defaultValues: {
      input: testCase.input || "",
      expectedOutput: testCase.expectedOutput || "",
    },
  });

  const session = useSession();

  const { mutate: update, isPending: isUpdating } = useUpdateTestCase();

  async function onSubmit(values: z.infer<typeof testCaseFormSchema>) {
    update(
      {
        id: testCase.id,
        data: {
          input: values.input,
          expectedOutput: values.expectedOutput,
        },
      },
      {
        onSuccess: () => {
          toast.success(`Teste atualizado com sucesso!\n`, {
            autoClose: 5000,
          });
          onSuccess?.();
        },
        onError: (error) => {
          console.error("Erro ao atualizar teste:", error);
          toast.error("Erro ao atualizar teste. Tente novamente.");
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
        <Button type="submit" className="cursor-pointer" disabled={isUpdating}>
          <PaperPlaneTiltIcon className="mr-2 h-4 w-4" />
          {isUpdating ? "Enviando..." : "Enviar Submissão"}
        </Button>
      </form>
    </Form>
  );
}
