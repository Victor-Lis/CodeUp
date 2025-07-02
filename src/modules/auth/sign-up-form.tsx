// components/auth/SignInForm.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useSignUp } from "@/hooks/use-auth";
import { toast } from "react-toastify";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "O nome é obrigatório.",
  }),
  credential: z.string().min(1, {
    message: "O nome de usuário é obrigatório.",
  }),
  password: z.string().min(1, {
    message: "A senha é obrigatória.",
  }),
});

export function SignUpForm() {
  const router = useRouter();

  const { mutate, error, isPending } = useSignUp();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      credential: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    mutate(
      {
        ...data,
      },
      {
        onSuccess: () => {
          toast.success("Usuário cadastrado com sucesso!");
          router.push("/login");
          router.refresh();
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-sm"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Seu Nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="credential"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="seu.usuario" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="#sua_senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error?.message.includes("500") && (
          <p className="text-sm font-medium text-destructive">
            Ocorreu um erro ao cadastrar o usuário. Já existe um usuário com este nome de usuário ou email!
          </p>
        )}

        <Button
          type="submit"
          className="w-full text-white cursor-pointer"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Cadastrando...
            </>
          ) : (
            "Cadastrar"
          )}
        </Button>
      </form>
    </Form>
  );
}
