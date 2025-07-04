import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type SignUpProps = {
  name: string;
  credential: string;
  password: string;
}

export function useSignUp() {
  return useMutation({
    mutationFn: async (data: SignUpProps) => {
      const user = await axios.post("/api/auth/signup", data);

      if (!user) {
        throw new Error("Sign up failed. Please check your credentials.");
      }

      return user;
    },
  });
}
