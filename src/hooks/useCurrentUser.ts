import { getCurrentUser } from "@/services/auth.services";
import { useQuery } from "@tanstack/react-query";

const useCurrentUser = () => {
  const { data, error, isPending, refetch } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["user-data"],
  });

  return {
    data,
    refetch,
    error,
    isPending,
  };
};

export default useCurrentUser;
