import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      toast.success("User data updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: () => toast.error("Unable to update current user"),
  });

  return { updateUser, isUpdating };
}
