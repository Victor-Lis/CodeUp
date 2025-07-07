import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateChallenge() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: Partial<ChallengeType>;
    }) => {
      const response = await api.put(`/challenge/update?id=${id}`, data);
      return response.data;
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["challenges", data.challengeId],
      });
    },
  });
}
