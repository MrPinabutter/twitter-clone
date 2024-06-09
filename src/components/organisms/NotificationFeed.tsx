"use client";

import useNotifications from "@/hooks/useNotifications";
import { getQueryClient } from "@/providers/ReactQueryProvider";
import { useEffect } from "react";
import NotificationItem from "../molecules/NotificationItem";

interface NotificationFeedProps {
  userId?: string;
}

const NotificationFeed: React.FC<NotificationFeedProps> = ({ userId }) => {
  const { data: notifications = [] } = useNotifications();
  const query = getQueryClient();

  useEffect(() => {
    query.invalidateQueries({
      queryKey: ["user-data"],
    });
  }, [query]);

  if (notifications.length === 0) {
    return (
      <div className="text-neutral-600 text-center p-6 text-lg">
        No notification
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {notifications.map((notification: Record<string, any>) => (
        <NotificationItem data={notification} key={notification.id} />
      ))}
    </div>
  );
};

export default NotificationFeed;
