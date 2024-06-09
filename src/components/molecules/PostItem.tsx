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

interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
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
      className="border-b border-neutral-800 px-5 pt-3 pb-1 hover:bg-neutral-900/30 transition w-full"
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

          <div className="flex flex-row items-center mt-3 gap-14 relative w-full">
            <button
              className="
                h-9 w-9
                flex flex-row 
                items-center
                justify-center
                hover:bg-sky-900/20
                text-neutral-500 hover:text-sky-500 
                gap-2 
                transition 
                relative rounded-full 
              "
            >
              <TbMessage size={20} />

              <span className="absolute right-0 translate-x-[80%]">
                {data.comments?.length ? data.comments?.length : null}
              </span>
            </button>

            <button
              onClick={onRepost}
              className="
                h-9 w-9
                flex flex-row 
                items-center
                justify-center
                hover:bg-emerald-900/20
                text-neutral-500 hover:text-emerald-500 
                gap-2 
                transition 
                relative rounded-full 
              "
            >
              <FaArrowsRotate size={20} />

              <span className="absolute right-0 translate-x-[80%]">
                {data.likes?.length}
              </span>
            </button>

            <button
              onClick={onLike}
              className={twMerge(`
                h-9 w-9
                flex flex-row 
                items-center
                justify-center
                hover:bg-pink-900/20
                text-neutral-500 hover:text-pink-500 
                gap-2 
                transition 
                relative rounded-full 
              `, hasLiked ? "text-pink-500" : "text-neutral-500 hover:text-pink-500")}
            >
              {hasLiked ? (
                <AiFillHeart size={20} />
              ) : (
                <AiOutlineHeart size={20}/>
              )}

              <span className="absolute right-0 translate-x-[80%]">
                {data.likedIds?.length}
              </span>
            </button>
          </div>
        </div>
      </div>
    </button>
  );
};

export default PostItem;
