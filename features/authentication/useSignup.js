import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        "Account created successfully! Please verify the new account from user's email address"
      );
    },
    onError: () => {
      toast.error("Cannot create account.");
    },
  });

  return { signup, isPending };
}
