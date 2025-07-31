import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateChallenge() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: CreateChallengeType;
    }) => {
      const formData = new FormData();
      formData.append("file", data.file);

      const response = await api.put(`/challenge/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["challenges", data.challengeId],
      });
    },
  });
}
