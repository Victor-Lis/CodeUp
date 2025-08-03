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
      data: Partial<Omit<CreateRunType, "challengeId">>;
    }) => {
      const formData = new FormData();
      data?.file && formData.append("file", data.file);
      data?.approved && formData.append("approved", String(data.approved));

      const response = await api.put(`/run/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["challenges", data.runId],
      });
    },
  });
}
