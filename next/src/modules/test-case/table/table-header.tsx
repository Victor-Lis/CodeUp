import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function TestCaseTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[80px]">ID</TableHead>
        <TableHead>Entrada (Input)</TableHead>
        <TableHead>Saída Esperada (Output)</TableHead>
        <TableHead className="w-[150px]">Criado em</TableHead>
        <TableHead className="w-[80px] text-right">Ações</TableHead>
      </TableRow>
    </TableHeader>
  );
}
