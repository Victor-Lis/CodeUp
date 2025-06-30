import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useSignUp() {
  return useMutation({
    mutationFn: async (data: { credential: string; password: string }) => {
      const user = await axios.post("/api/auth/signup", data);

      if (!user) {
        throw new Error("Sign up failed. Please check your credentials.");
      }

      return user;
    },
  });
}
