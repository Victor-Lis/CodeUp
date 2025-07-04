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
import { useCreateRun } from "@/hooks/use-run/create";
import { useUpdateRun } from "@/hooks/use-run/update";
import { Input } from "@/components/ui/input";

import fileUploadHandler from "@/lib/firebase/file";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
// import fileUploadHandler from "@/lib/firebase/file";

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

    const downloadURL = await fileUploadHandler(
      file,
      `challenges/${challengeId}/runs/`,
      session.data?.user?.id || "anonymous",
    );

    if (run && run.id) {
      update({
        id: run.id,
        data: {
          fileUrl: downloadURL,
        },
      });
    } else {
      create({
        fileUrl: downloadURL,
        challengeId: challengeId,
      });
    }
    toast.success(`Submissão para o Desafio #${challengeId} enviada!\n`, {
      autoClose: 5000,
    });
    toast.info("Clique em validar para verificar se a submissão está correta!", {
      autoClose: 10000,
    });
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
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel className="font-semibold">
                Textarea para submissão de runs
              </FormLabel> */}
              <FormControl>
                <Input
                  id="file"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.onChange(file);
                  }}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="cursor-pointer" disabled={isCreating || isUpdating}>
          <Send className="mr-2 h-4 w-4" />
          {isCreating || isUpdating ? "Enviando..." : "Enviar Submissão"}
        </Button>
      </form>
    </Form>
  );
}
