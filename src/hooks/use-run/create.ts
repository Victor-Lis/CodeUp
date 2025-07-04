import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { validateRun } from "./handle-validate";

export function useCreateRun() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<CreateRunType, "userId">) => {
      const response = await api.post("/run/create", data);
      return response.data;
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["challenges", data.runId],
      });
    },
  });
}