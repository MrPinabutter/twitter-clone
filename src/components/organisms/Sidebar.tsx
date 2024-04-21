'use client'
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import SidebarItem, { SideBarItemProps } from "../atoms/SidebarItem";
import SidebarLogo from "../atoms/SidebarLogo";
import { BiLogOut } from "react-icons/bi";
import TweetButton from "../atoms/TweetButton";

const Sidebar = () => {
  const items: SideBarItemProps[] = [
    {
      label: 'Home',
      href: '/',
      icon: BsHouseFill
    },
    {
      label: 'Notifications',
      href: '/notifications',
      icon: BsBellFill
    },
    {
      label: 'Profile',
      href: '/users/:id',
      icon: FaUser
    },
  ]

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="flex flex-col gap-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map(item => (
            <SidebarItem
              key={item.href}
              {...item}
            />
          ))}
          <SidebarItem
            href="#"
            icon={BiLogOut}
            label="Logout"
            onClick={() => { }}
          />

          <TweetButton className="mt-6" />
        </div>
      </div>
    </div>
  )
}

export default Sidebar;