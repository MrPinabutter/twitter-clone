import { getUsers } from "@/services/auth.services";
import { useQuery } from "@tanstack/react-query";

const useUsers = () => {
  const { data, error, isPending } = useQuery({
    queryFn: getUsers,
    queryKey: ["users-data"],
  });

  return {
    data,
    error,
    isPending,
  };
};

export default useUsers;
