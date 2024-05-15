"use client";

import useUser from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useCallback } from "react";
import { twMerge } from "tailwind-merge";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, hasBorder, isLarge }) => {
  const { data: user } = useUser(userId);

  const { push } = useRouter();

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.stopPropagation();

      const url = `/users/${userId}`;

      push(url);
    },
    [push, userId]
  );

  return (
    <button
      onClick={onClick}
      className={twMerge(
        "h-10 w-10  rounded-full hover:opacity-90 transition relative",
        hasBorder && "border-4 border-black hover:opacity-100 hover:brightness-110",
        isLarge && "h-32 w-32"
      )}
    >
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        alt="avatar"
        src={user?.profileImage || "/images/user-placeholder.png"}
      />
    </button>
  );
};

export default Avatar;
