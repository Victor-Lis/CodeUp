import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteChallenge() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`/challenge/delete`, { data: { id } });
      return response.data;
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["challenges", data.challengeId],
      });
    },
  });
}
