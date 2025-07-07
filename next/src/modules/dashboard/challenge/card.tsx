"use client";

import { useState } from "react";
import { useUpdateRun } from "@/hooks/use-run/update";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import SubmissionForm from "./submit-form";
import {
  FileText, Award
} from "lucide-react";
import { validateRun } from "@/hooks/use-run/handle-validate";
import RunStatus from "./run-status";

// Tipagem das props
interface ChallengeType {
  id: number;
  fileUrl: string;
  bucketPath: string;
  createdAt: Date;
  run: RunType | null;
}

interface RunType {
  id: number;
  approved: boolean;
  fileUrl: string;
  challengeId: number;
  userId: string;
  updatedAt: Date;
  createdAt: Date;
}

export default function ChallengeCard({
  challenge,
}: {
  challenge: ChallengeType;
}) {
  const [isValidating, setIsValidating] = useState(false);
  const { mutate } = useUpdateRun();

  // Variáveis para simplificar a lógica no JSX
  const hasRun = !!challenge.run;
  const isApproved = challenge.run?.approved === true;

  const handleValidateRun = async (id: number) => {
    setIsValidating(true);
    const response = await validateRun(id);
    if (response?.approved) {
      mutate({
        id,
        data: { approved: response.approved },
      });
    }
    setIsValidating(false);
  };

  return (
    <Card key={challenge.id} className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <span>Desafio #{challenge.id}</span>
          <RunStatus
            run={challenge.run}
            onRetry={handleValidateRun}
            isLoading={isValidating}
          />
        </CardTitle>
        <CardDescription>
          Criado em: {format(new Date(challenge.createdAt), "dd/MM/yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <a
            href={challenge.fileUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="w-full sm:w-auto">
              <FileText className="mr-2 h-4 w-4" />
              Baixar desafio
            </Button>
          </a>
          {challenge.run?.fileUrl && (
          <a
            href={challenge.run?.fileUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="w-full sm:w-auto">
              <FileText className="mr-2 h-4 w-4" />
              Baixar solução
            </Button>
          </a>
          )}
        </div>

        {isApproved ? (
          <div className="flex items-center justify-center text-center p-4 border-2 border-dashed border-green-400 rounded-lg my-2">
            <Award className="h-8 w-8 text-green-500 mr-4" />
            <div>
              <p className="font-semibold text-green-500">
                Parabéns, seu desafio foi aprovado!
              </p>
              <p className="text-sm text-green-500">
                Você pode visualizar sua submissão ou partir para o próximo
                desafio.
              </p>
            </div>
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value={`item-${challenge.id}`}>
              <AccordionTrigger className="text-primary hover:no-underline font-semibold">
                {hasRun ? "Submeter uma nova versão" : 'Submeter "Run"'}
              </AccordionTrigger>
              <AccordionContent>
                <SubmissionForm
                  challengeId={challenge.id}
                  run={challenge.run || undefined}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}
