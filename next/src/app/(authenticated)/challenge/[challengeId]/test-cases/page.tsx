"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

// Componentes UI e Ícones
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
import { Textarea } from "@/components/ui/textarea"; // Usando Textarea
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  PlusCircle,
  MoreHorizontal,
  Pencil,
  Trash2,
  Loader2,
  ArrowLeft,
} from "lucide-react";

// --- Tipagem e Dados Mockados ---

interface TestCaseType {
  id: number;
  input: string;
  expectedOutput: string;
  challengeId: number;
  createdAt: Date;
}

// Supondo que você tenha um hook para buscar os casos de teste
// import { useGetTestCases } from "@/hooks/use-test-case/get-all";
const MOCK_TEST_CASES: TestCaseType[] = [
  {
    id: 1,
    challengeId: 5,
    input: "Soma(1, 2)",
    expectedOutput: "3",
    createdAt: new Date(),
  },
  {
    id: 2,
    challengeId: 5,
    input: "Soma(5, -3)",
    expectedOutput: "2",
    createdAt: new Date(),
  },
  {
    id: 3,
    challengeId: 5,
    input:
      "Este é um input muito longo que deveria ser cortado na visualização da tabela para não quebrar o layout, mas aparece completo na edição.",
    expectedOutput: "Este é o output esperado que também é longo.",
    createdAt: new Date(),
  },
];

const testCaseSchema = z.object({
  input: z.string().min(1, "O campo de entrada é obrigatório."),
  expectedOutput: z.string().min(1, "O campo de saída esperada é obrigatório."),
});

// ============================================================================
// Componente Principal da Página
// Salvar como: app/admin/challenges/[challengeId]/test-cases/page.tsx
// ============================================================================
export default function AdminTestCasesPage() {
  const params = useParams();
  const challengeId = Number(params.challengeId);

  // TODO: Adicionar um hook para buscar os detalhes do desafio (ex: nome) e exibir no título.
  // const { data: challenge } = useGetChallengeById(challengeId);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <TestCaseHeader challengeId={challengeId} />
      <TestCaseTable challengeId={challengeId} />
    </div>
  );
}

// ============================================================================
// Header da Página de Casos de Teste
// ============================================================================
function TestCaseHeader({ challengeId }: { challengeId: number }) {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Desafios
        </Button>
        <h1 className="text-3xl font-bold">
          Casos de Teste do Desafio #{challengeId}
        </h1>
        <p className="text-muted-foreground">
          Adicione, edite ou remova casos de teste.
        </p>
      </div>
      {/* O Dialog de criação será acionado por este botão */}
    </div>
  );
}

// ============================================================================
// Tabela e Lógica de Gerenciamento
// ============================================================================
function TestCaseTable({ challengeId }: { challengeId: number }) {
  // --- Hooks de Estado e Dados ---
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [editingTestCase, setEditingTestCase] = useState<TestCaseType | null>(
    null
  );
  const [deletingTestCaseId, setDeletingTestCaseId] = useState<number | null>(
    null
  );

  // TODO: Substituir dados mockados pelo seu hook real
  // const { data: testCases, isLoading } = useGetTestCases({ challengeId });
  const isLoading = false;
  const testCases = MOCK_TEST_CASES.filter(
    (tc) => tc.challengeId === challengeId
  );

  const form = useForm<z.infer<typeof testCaseSchema>>({
    resolver: zodResolver(testCaseSchema),
    defaultValues: { input: "", expectedOutput: "" },
  });

  useEffect(() => {
    form.reset(
      editingTestCase
        ? {
            input: editingTestCase.input,
            expectedOutput: editingTestCase.expectedOutput,
          }
        : { input: "", expectedOutput: "" }
    );
  }, [editingTestCase, form]);

  // --- Funções Handler ---
  const handleAddNew = () => {
    setEditingTestCase(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (testCase: TestCaseType) => {
    setEditingTestCase(testCase);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setDeletingTestCaseId(id);
    setIsAlertOpen(true);
  };

  const confirmDelete = () => {
    console.log("Deletando caso de teste:", deletingTestCaseId);
    // TODO: Chamar a mutação para deletar
    setIsAlertOpen(false);
  };

  const onSubmit = (values: z.infer<typeof testCaseSchema>) => {
    if (editingTestCase) {
      console.log("Atualizando:", { id: editingTestCase.id, ...values });
      // TODO: Chamar a mutação para atualizar
    } else {
      console.log("Criando:", { challengeId, ...values });
      // TODO: Chamar a mutação para criar
    }
    setIsDialogOpen(false);
  };

  const truncateText = (text: string, maxLength = 50) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Caso de Teste
        </Button>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Entrada (Input)</TableHead>
              <TableHead>Saída Esperada (Output)</TableHead>
              <TableHead className="w-[150px]">Criado em</TableHead>
              <TableHead className="w-[80px] text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testCases.map((tc) => (
              <TableRow key={tc.id}>
                <TableCell>{tc.id}</TableCell>
                <TableCell className="font-mono text-sm">
                  {truncateText(tc.input)}
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {truncateText(tc.expectedOutput)}
                </TableCell>
                <TableCell>{format(tc.createdAt, "dd/MM/yyyy")}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(tc)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(tc.id)}
                        className="text-red-500"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Deletar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* --- Modais --- */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingTestCase ? "Editar Caso de Teste" : "Novo Caso de Teste"}
            </DialogTitle>
            <DialogDescription>
              Preencha os campos de entrada e a saída esperada.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 py-4"
            >
              <FormField
                control={form.control}
                name="input"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entrada (Input)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ex: [1, 2, 3]"
                        className="font-mono min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expectedOutput"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Saída Esperada (Expected Output)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ex: 6"
                        className="font-mono min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">Salvar</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita e irá remover o caso de teste
              permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Sim, deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
