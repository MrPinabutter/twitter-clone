import { getQueryClient } from "@/providers/ReactQueryProvider";
import { followUser, unFollowUser } from "@/services/follow.services";
import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "react-toastify";
import useCurrentUser from "./useCurrentUser";
import useAuthModal from "./useAuthModal";

interface useFollowProps {
  userId: string;
}

const useFollow = ({ userId }: useFollowProps) => {
  const queryClient = getQueryClient();
  const { data: currentUser } = useCurrentUser();
  const { onOpen } = useAuthModal();

  const { mutate: followMutate } = useMutation({
    mutationFn: async () => {
      if (!currentUser) return onOpen("login-modal");

      updateUserToFollow();
      const followUserResponse = await followUser(userId);

      return { followUserResponse };
    },
    onError: () => {
      updateUserToUnFollow();
      toast.error("An error occourred 🥺");
    },
  });

  const { mutate: unFollowMutate } = useMutation({
    mutationFn: async () => {
      if (!currentUser) return onOpen("login-modal");

      updateUserToUnFollow();
      const unfollowUserResponse = await unFollowUser(userId);

      return { unfollowUserResponse };
    },
    onError: () => {
      updateUserToFollow();
      toast.error("An error occourred 🥺");
    },
  });

  const updateUserToFollow = () => {
    queryClient.setQueryData(["user-data"], {
      ...currentUser,
      followingIds: [...currentUser.followingIds, userId],
    });
  };

  const updateUserToUnFollow = () => {
    queryClient.setQueryData(["user-data"], {
      ...currentUser,
      followingIds: currentUser.followingIds.filter(
        (id: string) => id !== userId
      ),
    });
  };

  const isFollowing = useMemo(
    () => (currentUser?.followingIds || []).includes(userId),
    [currentUser?.followingIds, userId]
  );

  const toggleFollowUser = () =>
    isFollowing ? unFollowMutate() : followMutate();

  return {
    isFollowing,
    toggleFollowUser,
  };
};

export default useFollow;
