import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export function useGetTestCases(
  challengeId: number,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: ["test-cases", challengeId],
    queryFn: async () => {
      const response = await api.get<TestCaseType[]>(
        `/test-cases/challenge/${challengeId}`,
      );
      return response.data;
    },
    enabled: options?.enabled ?? true,
  });
}
