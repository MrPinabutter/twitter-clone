"use client";

import useLike from "@/hooks/useLike";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaArrowsRotate } from "react-icons/fa6";
import { TbMessage } from "react-icons/tb";
import { twMerge } from "tailwind-merge";
import Avatar from "../atoms/Avatar";

interface CommentItemProps {
  data: Record<string, any>;
  userId?: string;
}

const CommentItem: React.FC<CommentItemProps> = ({ data, userId }) => {
  const router = useRouter();

  const { hasLiked, toggleLike } = useLike(data?.id, data?.user?.id);

  const goToUser = useCallback(
    (e: any) => {
      e.stopPropagation();
      router.push(`/users/${data.user.id}`);
    },
    [data.user.id, router]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [data.id, router]);

  const onLike = useCallback(
    (e: any) => {
      e.stopPropagation();

      toggleLike();
    },
    [toggleLike]
  );

  const onRepost = () => {};

  const createdAt = useMemo(() => {
    if (!data?.createdAt) return null;

    return formatDistanceToNowStrict(new Date(data.createdAt), {});
  }, [data?.createdAt]);

  return (
    <button
      onClick={goToPost}
      className="border-b border-neutral-800 px-5 py-3 hover:bg-neutral-900/30 transition w-full"
    >
      <div className="flex flex-row items-start gap-2">
        <Avatar userId={data.user.id} />

        <div className="w-full">
          <button
            className="flex flex-row items-center gap-1"
            onClick={goToUser}
          >
            <p className="text-white font-semibold hover:underline">
              {data.user.name}
            </p>
            <span className="text-neutral-500">@{data.user.username}</span>
            <span className="text-neutral-500">·</span>
            <span className="text-neutral-500 hover:underline">
              {createdAt}
            </span>
          </button>

          <div className="text-white mt-0.5 text-start w-full">{data.body}</div>
        </div>
      </div>
    </button>
  );
};

export default CommentItem;
