import {
  TableBody
} from "@/components/ui/table";

import { useGetChallenges } from "@/hooks/use-challenge/get-all";
import ChallengeTableRow from "./table-row";

export default function ChallengeTableBody() {
  const { data: challenges, isLoading } = useGetChallenges();
  return (
    <TableBody>
      {challenges?.map((challenge) => (
        <ChallengeTableRow key={challenge.id} challenge={challenge} />
      ))}
    </TableBody>
  );
}
