import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTestCase() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`/test-case/delete`, { data: { id } });
      return response.data;
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["testcases", data.testcaseId],
      });
    },
  });
}
