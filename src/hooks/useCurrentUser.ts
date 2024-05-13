import { getCurrentUser } from "@/services/auth.services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const useCurrentUser = () => {
  const { data, error, isPending } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["user-data"],
  });

  return {
    data,
    error,
    isPending,
  };
};

export default useCurrentUser;
