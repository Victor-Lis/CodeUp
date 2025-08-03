import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTestCase() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateTestCaseType) => {
      const response = await api.post(`/test-case`, data);
      return response.data;
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["test-cases"],
      });
      queryClient.invalidateQueries({
        queryKey: ["challenges"],
      });
    },
  });
}
