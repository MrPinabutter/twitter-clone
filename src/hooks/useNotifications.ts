"use client";

import { getUserNotifications } from "@/services/auth.services";
import { useQuery } from "@tanstack/react-query";
import useCurrentUser from "./useCurrentUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useNotifications = () => {
  const { data: currentUser, isPending: userLoadingPending } = useCurrentUser();

  const { data, error, isPending, refetch } = useQuery({
    queryFn: () => getUserNotifications(),
    queryKey: ["notifications"],
    enabled: !!currentUser,
  });

  const { push } = useRouter();

  useEffect(() => {
    if (!currentUser && !userLoadingPending) {
      push("/");
    }
  }, [currentUser, userLoadingPending, push]);

  return {
    data,
    error,
    refetch,
    isPending,
  };
};

export default useNotifications;
