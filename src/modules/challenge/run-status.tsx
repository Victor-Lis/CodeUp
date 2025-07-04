import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Loader2, ShieldCheck, ShieldX, X } from "lucide-react";

export default function RunStatus({
  run,
  onRetry,
  isLoading,
}: {
  run: RunType | null;
  onRetry: (id: number) => void;
  isLoading: boolean;
}) {
  if (!run) {
    return (
      <Badge variant="destructive" className="ml-3">
        <X className="mr-1 h-3 w-3" /> Não submetido
      </Badge>
    );
  }

  return (
    <>
      <Badge variant="secondary" className="ml-3">
        <Check className="mr-1 h-3 w-3 text-green-500" /> Submetido
      </Badge>
      <div className="flex items-center ml-auto">
        {run.approved ? (
          <Badge
            variant="default"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <ShieldCheck className="mr-1 h-3 w-3" /> Aprovado
          </Badge>
        ) : (
          <div className="flex items-center gap-2 text-white">
            <Badge variant="destructive">
              <ShieldX className="mr-1 h-3 w-3" /> Reprovado
            </Badge>
            <Button
              size="sm"
              variant="link"
              className="p-0 h-auto text-xs cursor-pointer"
              onClick={() => onRetry(run.id)}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Validar"
              )}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
