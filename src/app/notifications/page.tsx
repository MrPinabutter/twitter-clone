"use client";

import Header from "@/components/molecules/Header";
import NotificationFeed from "@/components/organisms/NotificationFeed";

export default function Notifications() {
  return (
    <>
      <Header label="Notifications" showBackArrow />
      <NotificationFeed />
    </>
  );
}
