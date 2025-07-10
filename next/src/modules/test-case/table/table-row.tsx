// app/admin/challenges/[challengeId]/test-cases/components/TestCaseTable.tsx
"use client";

import { format } from "date-fns";

import { TableCell, TableRow } from "@/components/ui/table";
import UpdateTestCaseDialog from "../update/dialog";
import DeleteTestCaseDialog from "../delete/dialog";

export function TestCaseTableRow({ testCase }: { testCase: TestCaseType }) {
  const truncateText = (text: string, maxLength = 50) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <TableRow key={testCase.id}>
      <TableCell>{testCase.id}</TableCell>
      <TableCell className="font-mono text-sm">
        {truncateText(testCase.input)}
      </TableCell>
      <TableCell className="font-mono text-sm">
        {truncateText(testCase.expectedOutput)}
      </TableCell>
      <TableCell>{format(testCase.createdAt, "dd/MM/yyyy")}</TableCell>
      <TableCell className="flex items-center justify-end py-3 gap-3">
        <UpdateTestCaseDialog testCase={testCase} />
        <DeleteTestCaseDialog testCase={testCase} />
      </TableCell>
    </TableRow>
  );
}
