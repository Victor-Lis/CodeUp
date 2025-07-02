import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateRun() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<CreateRunType, "userId">) => {
      const response = await api.post("/run", data);
      return response.data;
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["challenges", data.runId],
      });
    },
  });
}