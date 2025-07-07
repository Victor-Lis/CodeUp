import ChallengeTableHeader from "./table-header";
import ChallengeTableBody from "./table-body";
import { Table } from "@/components/ui/table";
import { useGetChallenges } from "@/hooks/use-challenge/get-all";
import { Loader2 } from "lucide-react";

export default function ChallengeTable() {
  const { isLoading } = useGetChallenges();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <ChallengeTableHeader />
        <ChallengeTableBody />
      </Table>
    </div>
  );
}
