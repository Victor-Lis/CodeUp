import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export function useGetTestCases(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["test-cases"],
    queryFn: async () => {
      const response = await api.get<TestCaseType[]>(`/test-case/get-all`);
      return response.data;
    },
    enabled: options?.enabled ?? true,
  });
}