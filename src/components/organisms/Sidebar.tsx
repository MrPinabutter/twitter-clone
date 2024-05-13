"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import SidebarItem, { SideBarItemProps } from "../atoms/SidebarItem";
import SidebarLogo from "../atoms/SidebarLogo";
import TweetButton from "../atoms/TweetButton";

const Sidebar = () => {
  const { data: currentUser } = useCurrentUser();

  const items: SideBarItemProps[] = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
      isProtected: true,
    },
    {
      label: "Profile",
      href: "/users/:id",
      icon: FaUser,
      isProtected: true,
    },
  ];

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="flex flex-col gap-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem key={item.href} {...item} />
          ))}

          {currentUser && (
            <SidebarItem
              href=""
              icon={BiLogOut}
              label="Logout"
              onClick={() => signOut()}
            />
          )}

          <TweetButton className="mt-6" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
