import ChallengeTableHeader from "./table-header";
import ChallengeTableBody from "./table-body";
import { Table } from "@/components/ui/table";
import { useGetChallenges } from "@/hooks/use-challenge/get-all";
import { CircleNotchIcon } from "@phosphor-icons/react"

export default function ChallengeTable() {
  const { isLoading } = useGetChallenges();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <CircleNotchIcon className="h-8 w-8 animate-spin" />
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
