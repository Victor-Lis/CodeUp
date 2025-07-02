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

import {
  FileText,
  Loader2,
  Check,
  X,
  ShieldCheck,
  ShieldX,
} from "lucide-react";
import SubmissionForm from "./submit-form";
import { format } from "date-fns";
import { useUpdateRun } from "@/hooks/use-run/update";
import { useSession } from "next-auth/react";

export default function ChallengeCard({
  challenge,
}: {
  challenge: ChallengeType;
}) {
  return (
    <Card key={challenge.id} className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <span>Desafio #{challenge.id}</span>
          {challenge?.run ? (
            <Check aria-label="Run submetido" className="ml-2 text-green-400" />
          ) : (
            <X aria-label="Run não submetido" className="ml-2 text-red-400" />
          )}
        </CardTitle>
        <CardDescription>
          Criado em: {format(new Date(challenge.createdAt), "dd/MM/yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <a href={challenge.fileUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="w-full sm:w-auto">
            <FileText className="mr-2 h-4 w-4" />
            Conteúdo em formato PDF do Challenge
          </Button>
        </a>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value={`item-${challenge.id}`}>
            <AccordionTrigger className="text-primary hover:no-underline">
              Submeter "Run" (clique para ver mais)
            </AccordionTrigger>
            <AccordionContent>
              <SubmissionForm
                challengeId={challenge.id}
                run={challenge?.run ? challenge.run : undefined}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
