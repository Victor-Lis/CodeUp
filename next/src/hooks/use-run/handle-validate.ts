import { useQuery } from "@tanstack/react-query";

type RunValidationResponse = {
  approved: boolean;
  runId: number;
};

export default function useRunValidation({ runId }: { runId: number }) {
  return useQuery({
    queryKey: ["run-validation", runId],
    queryFn: async (): Promise<RunValidationResponse> => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_VALIDATOR_API_URL}/?runId=${runId}`
      );
      return response.json();
    },
  });
}

type handleValidateRunResponse = {
  approved: boolean;
};

export const validateRun = async (
  id: number
): Promise<handleValidateRunResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VALIDATOR_API_URL}/?runId=${id}`
    );
    const data = await response.json();
    return { approved: data.approved };
  } catch (error) {
    console.error("Failed to validate run:", error);
    return { approved: false };
  }
};
