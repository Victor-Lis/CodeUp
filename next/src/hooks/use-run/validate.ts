import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useValidateRun() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const response = await api.put(`/run/${id}/validate`);
      return response.data;
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["challenges", data.runId],
      });
    },
  });
}