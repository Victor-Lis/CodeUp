import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { validateRun } from "./handle-validate";

export function useUpdateRun() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: Partial<RunType>;
    }) => {
      const response = await api.put(`/run/update?id=${id}`, data);
      return response.data;
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["challenges", data.runId],
      });
    },
  });
}
