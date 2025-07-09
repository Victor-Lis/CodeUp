import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import UpdateChallengeDialog from "../update/dialog";
import DeleteChallengeDialog from "../delete/dialog";

import { FlaskConical } from 'lucide-react'
import Link from "next/link";

export default function ChallengeTableRow({
  challenge,
}: {
  challenge: ChallengeType;
}) {
  return (
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
      <TableCell>{format(challenge.createdAt, "dd/MM/yyyy")}</TableCell>
      <TableCell className="text-center">
        <Badge variant="secondary">{challenge.runs.length}</Badge>
      </TableCell>
      <TableCell className="flex items-center justify-end py-3 gap-3">
        <Link href={`/challenge/${challenge.id}/test-cases`}>
          <FlaskConical className="h-5.5 w-5.5" />
        </Link>
        <UpdateChallengeDialog challenge={challenge} />
        {challenge.runs.length > 0 ? null : <DeleteChallengeDialog challenge={challenge} />}
      </TableCell>
    </TableRow>
  );
}
