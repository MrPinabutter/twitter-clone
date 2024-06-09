"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { BsTwitter } from "react-icons/bs";

interface NotificationItemProps {
  data: Record<string, any>;
  userId?: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ data }) => {
  const router = useRouter();

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [data.id, router]);

  return (
    <button
      onClick={goToPost}
      className="flex flex-row items-center p-4 gap-4 border-b border-neutral-800"
    >
      <BsTwitter color="white" size="32" />

      <span className="text-white">{data.body}</span>
    </button>
  );
};

export default NotificationItem;
