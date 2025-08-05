import { useMutation } from "@tanstack/react-query";
import { useAPI } from "@/lib/axios";

type SignUpProps = {
  name: string;
  credential: string;
  password: string;
}

export function useSignUp() {
  const api = useAPI();
  console.log("[API URL]", api.defaults.baseURL);
  
  return useMutation({
    mutationFn: async (data: SignUpProps) => {
      const user = await api.post("/auth/sign-up", data);

      if (!user) {
        throw new Error("Sign up failed. Please check your credentials.");
      }

      return user;
    },
  });
}
