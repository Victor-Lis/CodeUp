import {
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const challengeFormSchema = z.object({
  title: z.string().min(5, "O título precisa ter no mínimo 5 caracteres."),
  fileUrl: z.string().url("Por favor, insira uma URL válida."),
});

export default function CreateChallengeForm() {
  const form = useForm({
    resolver: zodResolver(challengeFormSchema),
    defaultValues: {
      title: "",
      fileUrl: "",
    },
  });

  const onSubmit = (values: z.infer<typeof challengeFormSchema>) => {
    console.log("Submitting form:", values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título do Desafio</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Análise de Dados Financeiros"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fileUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL do Arquivo PDF</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit">Salvar</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
