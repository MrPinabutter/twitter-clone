import { getUserById } from "@/services/auth.services";
import { useQuery } from "@tanstack/react-query";

const useUser = (id: string) => {
  const { data, error, isPending } = useQuery({
    queryFn: () => getUserById(id),
    queryKey: ["user-data", id],
  });

  return {
    data,
    error,
    isPending,
  };
};

export default useUser;
