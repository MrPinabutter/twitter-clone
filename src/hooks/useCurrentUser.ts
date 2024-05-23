import { getCurrentUser } from "@/services/auth.services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

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
