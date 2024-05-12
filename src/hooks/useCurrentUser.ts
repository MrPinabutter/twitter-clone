'use client'

import { getUser } from "@/services/auth.services";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

const useCurrentUser = () => {
  const { data, error, isPending, mutate } = useMutation({
    mutationFn: getUser,
  });

  useEffect(() => {
    mutate();
  }, [])

  return {
    data,
    error,
    isPending,
    mutate,
  };
};

export default useCurrentUser;
