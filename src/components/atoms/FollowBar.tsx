"use client";

import useUsers from "@/hooks/useUsers";
import Avatar from "./Avatar";

const FollowBar = () => {
  const { data: users = [] } = useUsers();

  if (users.length === 0) return null;

  return (
    <section className="px-6 py-4 hidden lg:block">
      <div className="border border-neutral-800 rounded-xl px-4 py-3">
        <span className="text-white font-semibold text-lg">Who to follow</span>

        <div className="flex flex-col gap-6 mt-6">
          {users.map((user: Record<string, any>) => (
            <div className="flex flex-row gap-2" key={user.id}>
              <Avatar userId={user.id} />

              <div className="flex flex-col">
                <p className="text-white font-semibold text-sm">{user.name}</p>

                <p className="text-neutral-400 text-sm">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FollowBar;
