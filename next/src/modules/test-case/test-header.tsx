"use client";

import { redirect, useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, PlusCircleIcon } from "@phosphor-icons/react/dist/ssr";
import CreateTestCaseDialog from "./create/dialog";

export default function TestCaseHeader() {
  const challengeId = Number(useParams().challengeId);

  if (isNaN(challengeId)) {
    redirect("/challenge");
  }

  const router = useRouter();

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4 py-1 px-2 cursor-pointer"
        >
          <ArrowLeftIcon className="size-6" />
          Voltar para Desafios
        </Button>
        <h1 className="text-3xl font-bold">
          Casos de Teste do Desafio #{challengeId}
        </h1>
        <p className="text-muted-foreground">
          Adicione, edite ou remova casos de teste.
        </p>
      </div>
      <div className="flex justify-end mb-4">
        <CreateTestCaseDialog />
      </div>
    </div>
  );
}
