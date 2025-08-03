"use client";

import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { CircleNotchIcon } from "@phosphor-icons/react"

import { TestCaseTableRow } from "./table-row";
import { useGetTestCases } from "@/hooks/use-test-case/get-by-challenge";
import { redirect, useParams } from "next/navigation";

export function TestCaseTableBody() {
  const challengeId = Number(useParams().challengeId);

  if (isNaN(challengeId)) {
    redirect("/challenge");
  }

  const { data: testCases, isLoading } = useGetTestCases(challengeId);

  if (isLoading) {
    return (
      <TableBody>
        <TableRow className="flex justify-center py-3">
          <TableCell colSpan={6} className="text-center">
            <CircleNotchIcon className="size-6 animate-spin" />
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  if (!testCases?.length) {
    return (
      <TableBody>
        <TableRow className="flex justify-center py-3">
          <TableCell colSpan={6} className="text-center w-full">
            Nenhum teste encontrado.
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {testCases?.map((tc) => (
        <TestCaseTableRow key={tc.id} testCase={tc} />
      ))}
    </TableBody>
  );
}
