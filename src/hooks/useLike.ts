"use client";

import { getQueryClient } from "@/providers/ReactQueryProvider";
import { toast } from "react-toastify";
import useCurrentUser from "./useCurrentUser";
import useAuthModal from "./useAuthModal";
import { useMutation } from "@tanstack/react-query";
import { likePost, unlikePost } from "@/services/posts.services";
import { useMemo } from "react";
import usePost from "./usePost";

const useLike = (postId: string, userId: string) => {
  const queryClient = getQueryClient();
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost } = usePost(postId);
  const { onOpen } = useAuthModal();

  const { mutate: likeMutate } = useMutation({
    mutationFn: async () => {
      if (!currentUser) return onOpen("login-modal");

      updatePostToLike();
      const followUserResponse = await likePost(postId);

      return { followUserResponse };
    },
    onError: () => {
      updatePostToUnlike();
      toast.error("An error occourred 🥺");
    },
  });

  const { mutate: unlikeMutate } = useMutation({
    mutationFn: async () => {
      if (!currentUser) return onOpen("login-modal");

      updatePostToUnlike();
      const unfollowUserResponse = await unlikePost(postId);

      return { unfollowUserResponse };
    },
    onError: () => {
      updatePostToLike();
      toast.error("An error occourred 🥺");
    },
  });

  const updatePostToLike = () => {
    const setData = (queryKey: string | null) => {
      queryClient.setQueryData(["posts", queryKey], (old: any[]) =>
        old?.map((it) =>
          it.id === postId
            ? { ...it, likedIds: [...(it.likedIds || []), currentUser.id] }
            : it
        )
      );
    };
    setData(null);
    setData(userId);

    queryClient.setQueryData(["post", postId], (old: any) => ({
      ...old,
      likedIds: [...(old?.likedIds || []), currentUser.id],
    }));
  };

  const updatePostToUnlike = () => {
    const setData = (queryKey: string | null) => {
      queryClient.setQueryData(["posts", queryKey], (old: any[]) =>
        old?.map((it) =>
          it.id === postId
            ? {
                ...it,
                likedIds: [...(it.likedIds || [])].filter(
                  (likes) => likes !== currentUser.id
                ),
              }
            : it
        )
      );
    };

    setData(null);
    setData(userId);

    queryClient.setQueryData(["post", postId], (old: any) => ({
      ...old,
      likedIds: [...(old.likedIds || [])].filter(
        (likes) => likes !== currentUser.id
      ),
    }));
  };

  const hasLiked = useMemo(
    () => (fetchedPost?.likedIds || []).includes(currentUser?.id),
    [fetchedPost?.likedIds, currentUser?.id]
  );

  const toggleLike = () => (hasLiked ? unlikeMutate() : likeMutate());

  return {
    toggleLike,
    hasLiked,
  };
};

export default useLike;
