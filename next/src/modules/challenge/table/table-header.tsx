import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ChallengeTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[80px]">ID</TableHead>
        <TableHead>Arquivo</TableHead>
        <TableHead className="w-[150px]">Criado em</TableHead>
        <TableHead className="w-[150px] text-center">Submissões</TableHead>
        <TableHead className="w-[80px] text-right">Ações</TableHead>
      </TableRow>
    </TableHeader>
  );
}