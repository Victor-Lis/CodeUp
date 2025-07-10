import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
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
import { useCreateChallenge } from "@/hooks/use-challenge/create";
import { useGetChallenges } from "@/hooks/use-challenge/get-all";

const challengeFormSchema = z.object({
  file: z.instanceof(File),
});

type CreateChallengeFormProps = {
  onSuccess?: () => void;
}

export default function CreateChallengeForm({ onSuccess }: CreateChallengeFormProps) {
  const form = useForm<z.infer<typeof challengeFormSchema>>({
    resolver: zodResolver(challengeFormSchema),
    defaultValues: {
      file: new File([""], "", { type: "text/x-python" }),
    },
  });

  const session = useSession();

  const { data: challenges } = useGetChallenges();
  const { mutate: create, isPending: isCreating } = useCreateChallenge();

  async function onSubmit(values: z.infer<typeof challengeFormSchema>) {
    const file = values.file;

    const challengeId = challenges?.length ? challenges[0].id + 1 : 1;

    const downloadURL = await fileUploadHandler(
      file,
      `challenges/${challengeId}/`,
      `challenge-${challengeId}` || "anonymous"
    );

    create(
      {
        fileUrl: downloadURL,
      },
      {
        onSuccess: () => {
          toast.success(`Desafio #${challengeId} enviado!\n`, {
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
          {isCreating ? "Enviando..." : "Enviar Submissão"}
        </Button>
      </form>
    </Form>
  );
}
