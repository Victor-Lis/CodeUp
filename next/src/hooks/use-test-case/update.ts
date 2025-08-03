import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTestCase() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: Partial<TestCaseType>;
    }) => {
      const response = await api.put(`/test-case/${id}`, data);
      return response.data;
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["test-cases"],
      });
    },
  });
}
