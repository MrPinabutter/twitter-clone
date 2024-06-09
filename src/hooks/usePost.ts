"use client";

import { getPost } from "@/services/posts.services";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const usePost = (postId?: string) => {
  const { data, isPending } = useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      return await getPost(postId).catch((e) =>
        toast.error("An error occourred getting post! 🥲")
      );
    },
  });

  return { data, isPending };
};

export default usePost;
