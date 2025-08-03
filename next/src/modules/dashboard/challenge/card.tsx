"use client";

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
import { CertificateIcon, FileTextIcon } from "@phosphor-icons/react";
import RunStatus from "./run-status";
import { useValidateRun } from "@/hooks/use-run/validate";

export default function ChallengeCard({
  challenge,
}: {
  challenge: ChallengeType;
}) {
  const { mutate: validateRun, isPending } = useValidateRun();

  const hasRun = () => !!challenge.run;
  const isApproved = () => challenge.run?.approved === true;

  return (
    <Card key={challenge.id} className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <span>Desafio #{challenge.id}</span>
          {hasRun() && (
            <RunStatus
              run={challenge.run}
              onRetry={() => {
                if (challenge.run) {
                  validateRun({ id: challenge.run.id });
                }
              }}
              isLoading={isPending}
            />
          )}
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
              <FileTextIcon className="mr-2 h-4 w-4" />
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
                <FileTextIcon className="mr-2 h-4 w-4" />
                Baixar solução
              </Button>
            </a>
          )}
        </div>

        {isApproved() ? (
          <div className="flex items-center justify-center text-center p-4 border-2 border-dashed border-green-400 rounded-lg my-2">
            <CertificateIcon className="h-8 w-8 text-green-500 mr-4" />
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
                {hasRun() ? "Submeter uma nova versão" : 'Submeter "Run"'}
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
