import { getUser } from "@/services/auth.services";
import { useMutation } from "@tanstack/react-query";

const useCurrentUser = () => {
  const { data, error, isPending, mutate } = useMutation({
    mutationFn: getUser,
  });

  return {
    data,
    error,
    isPending,
    mutate,
  };
};

export default useCurrentUser;
