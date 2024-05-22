"use client";

import { createPost, getPosts } from "@/services/posts.services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const usePosts = (userId?: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["posts", userId],
    queryFn: () => getPosts(userId),
  });

  const { mutate, isPending: isCreatePending } = useMutation({
    mutationFn: async (data: { body: string }) => {
      try {
        const { data: responseData } = await createPost(data);
        toast.success("Tweet Created");
        return responseData;
      } catch (e) {
        toast.error("Something went wrong 😨");
      }
    },
  });

  return { data, isPending, mutate, isCreatePending };
};

export default usePosts;
