import { getUserById } from "@/services/auth.services";
import { useQuery } from "@tanstack/react-query";

const useUser = (id: string) => {
  const { data, error, isPending, refetch } = useQuery({
    queryFn: () => getUserById(id),
    queryKey: ["user-data", id],
  });

  return {
    data,
    error,
    refetch,
    isPending,
  };
};

export default useUser;
