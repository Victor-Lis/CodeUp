// components/auth/SignInForm.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
import { Loader2 } from "lucide-react"; // Para o ícone de loading

// 1. Defina o schema de validação com Zod
const formSchema = z.object({
  username: z.string().min(1, {
    message: "O nome de usuário é obrigatório.",
  }),
  password: z.string().min(1, {
    message: "A senha é obrigatória.",
  }),
});

export function SignInForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. Defina o formulário com React Hook Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 3. Defina a função de submissão
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setError(null);

    try {
      // 4. Use a função signIn do NextAuth
      const result = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false, // Importante: não redireciona a página inteira
      });

      if (result?.error) {
        // Se houver um erro de autenticação (retornado do `authorize`)
        setError("Credenciais inválidas. Tente novamente.");
        setIsSubmitting(false);
      } else if (result?.ok) {
        // Se o login for bem-sucedido, redirecione para o dashboard
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Falha ao fazer login:", err);
      setError("Ocorreu um erro inesperado. Tente novamente.");
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-sm"
      >
        {/* Campo Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="seu_usuario" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="sua_senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Mensagem de Erro Global */}
        {error && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}

        {/* Botão de Submit */}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Entrando...
            </>
          ) : (
            "Entrar"
          )}
        </Button>
      </form>
    </Form>
  );
}
