import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateRun() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<CreateRunType, "userId">) => {
      const formData = new FormData();
      formData.append("file", data.file);
      formData.append("challengeId", String(data.challengeId));
      
      const response = await api.post("/run/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["challenges"],
      });
    },
  });
}
