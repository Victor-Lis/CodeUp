import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export function useGetChallenges(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["challenges"],
    queryFn: async () => {
      const response = await api.get<ChallengeType[]>(`/challenge`);
      return response.data;
    },
    enabled: options?.enabled ?? true,
  });
}