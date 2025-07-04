"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

// (Supostamente, você teria hooks para criar, atualizar e deletar)
// import { useCreateChallenge } from "@/hooks/use-challenge/create";
// import { useUpdateChallenge } from "@/hooks/use-challenge/update";
// import { useDeleteChallenge } from "@/hooks/use-challenge/delete";
import { useGetChallenges } from "@/hooks/use-challenge/get-all";

// Importando componentes do shadcn/ui
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Importando ícones
import {
  PlusCircle,
  MoreHorizontal,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Interface atualizada para incluir um título
interface ChallengeType {
  id: number;
  title: string; // Adicionado para melhor UX
  fileUrl: string;
  bucketPath: string;
  createdAt: Date;
  runs: unknown[]; // Apenas precisamos do `length`
}

// Esquema de validação para o formulário
const challengeFormSchema = z.object({
  title: z.string().min(5, "O título precisa ter no mínimo 5 caracteres."),
  fileUrl: z.string().url("Por favor, insira uma URL válida."),
});

// --- DADOS MOCKADOS PARA DEMONSTRAÇÃO ---
// Remova ou substitua isso pelo seu hook `useGetChallenges`
const MOCK_CHALLENGES: ChallengeType[] = [
  {
    id: 101,
    title: "Análise de Sentimentos em Tweets",
    fileUrl: "https://example.com/challenge1.pdf",
    bucketPath: "/path1",
    createdAt: new Date("2024-06-28"),
    runs: [{}, {}, {}],
  },
  {
    id: 102,
    title: "Sistema de Recomendação de Filmes",
    fileUrl: "https://example.com/challenge2.pdf",
    bucketPath: "/path2",
    createdAt: new Date("2024-06-20"),
    runs: [{}, {}, {}, {}, {}],
  },
  {
    id: 103,
    title: "Otimização de Rota de Entregas",
    fileUrl: "https://example.com/challenge3.pdf",
    bucketPath: "/path3",
    createdAt: new Date("2024-05-15"),
    runs: [],
  },
];

export default function AdminChallengesPage() {
  // Estado para controlar os modais
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // Estado para saber qual desafio está sendo editado ou deletado
  const [editingChallenge, setEditingChallenge] =
    useState<ChallengeType | null>(null);
  const [deletingChallengeId, setDeletingChallengeId] = useState<number | null>(
    null
  );

  // Hooks de dados (usando mock por enquanto)
  // const { data: challenges, isLoading } = useGetChallenges({});
  // const challenges = MOCK_CHALLENGES;
  const { data: challenges, isLoading } = useGetChallenges()

  challenges?.map((challenge) => {
    console.log(`ID: ${challenge.id}, Runs: ${challenge.runs}`);
  })
  // Hooks de mutação (simulados)
  // const createChallenge = useCreateChallenge();
  // const updateChallenge = useUpdateChallenge();
  // const deleteChallenge = useDeleteChallenge();

  const form = useForm<z.infer<typeof challengeFormSchema>>({
    resolver: zodResolver(challengeFormSchema),
    defaultValues: { title: "", fileUrl: "" },
  });

  useEffect(() => {
    if (editingChallenge) {
      form.reset({
        title: editingChallenge.title,
        fileUrl: editingChallenge.fileUrl,
      });
    } else {
      form.reset({ title: "", fileUrl: "" });
    }
  }, [editingChallenge, form]);

  const handleAddNew = () => {
    setEditingChallenge(null);
    setIsFormOpen(true);
  };

  const handleEdit = (challenge: ChallengeType) => {
    setEditingChallenge(challenge);
    setIsFormOpen(true);
  };

  const handleDelete = (challengeId: number) => {
    setDeletingChallengeId(challengeId);
    setIsAlertOpen(true);
  };

  const confirmDelete = () => {
    // TODO: Chamar a mutação para deletar
    // deleteChallenge.mutate(deletingChallengeId);
    console.log("Deletando desafio:", deletingChallengeId);
    setIsAlertOpen(false);
  };

  const onSubmit = (values: z.infer<typeof challengeFormSchema>) => {
    if (editingChallenge) {
      // TODO: Chamar a mutação para atualizar
      // updateChallenge.mutate({ id: editingChallenge.id, ...values });
      console.log("Atualizando desafio:", {
        id: editingChallenge.id,
        ...values,
      });
    } else {
      // TODO: Chamar a mutação para criar
      // createChallenge.mutate(values);
      console.log("Criando novo desafio:", values);
    }
    setIsFormOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Gerenciar Desafios</h1>
            <p className="text-muted-foreground">
              Adicione, edite ou remova desafios.
            </p>
          </div>
          <Button onClick={handleAddNew}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Novo
          </Button>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Arquivo</TableHead>
                <TableHead className="w-[150px]">Criado em</TableHead>
                <TableHead className="w-[150px] text-center">
                  Submissões
                </TableHead>
                <TableHead className="w-[80px] text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {challenges?.map((challenge) => (
                <TableRow key={challenge.id}>
                  <TableCell className="font-medium">{challenge.id}</TableCell>
                  <TableCell>
                    <a
                      href={challenge.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Ver Desafio
                    </a>
                  </TableCell>
                  <TableCell>
                    {format(challenge.createdAt, "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary">{challenge.runs.length}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {/* <DropdownMenuItem onClick={() => handleEdit(challenge)}> */}
                        <DropdownMenuItem onClick={() => {}}>
                          <Pencil className="mr-2 h-4 w-4" />
                          <span>Editar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(challenge.id)}
                          className="text-red-400"
                        >
                          <Trash2 className="mr-2 h-4 w-4 text-red-400" />
                          <span>Deletar</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modal de Formulário (Criar/Editar) */}
      {/* <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingChallenge ? "Editar Desafio" : "Adicionar Novo Desafio"}
            </DialogTitle>
            <DialogDescription>
              {editingChallenge
                ? "Atualize os detalhes do desafio."
                : "Preencha os detalhes para criar um novo desafio."}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 py-4"
            >
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
        </DialogContent>
      </Dialog> */}

      {/* Modal de Confirmação (Deletar) */}
      {/* <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. Isso irá deletar permanentemente
              o desafio do servidor.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Sim, deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </>
  );
}
