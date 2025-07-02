import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useCreateRun } from "@/hooks/use-run/create";
import { useUpdateRun } from "@/hooks/use-run/update";

const runFormSchema = z.object({
  content: z.string().min(1, {
    message: "A submissão deve ter pelo menos 10 caracteres.",
  }),
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
      content: run?.content || "",
    },
  });

  const { mutate: create } = useCreateRun();
  const { mutate: update } = useUpdateRun();

  function onSubmit(values: z.infer<typeof runFormSchema>) {
    if (run && run.id) {
      update({
        id: run.id,
        data: {
          content: values.content,
        },
      });
    } else {
      create({
        content: values.content,
        challengeId: challengeId,
      });
    }
    alert(
      `Submissão para o Desafio #${challengeId} enviada!\nConteúdo: ${values.content}`
    );
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">
                Textarea para submissão de runs
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Cole aqui o conteúdo da sua 'run' para submissão..."
                  className="resize-y min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="cursor-pointer">
          <Send className="mr-2 h-4 w-4" />
          Enviar Submissão
        </Button>
      </form>
    </Form>
  );
}
