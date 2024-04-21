import Link from "next/link";
import { IconType } from "react-icons";

export interface SideBarItemProps {
  label: string;
  href: string;
  icon: IconType;
  onClick?: () => void;
}[]

const SidebarItem = ({ label, href, icon: Icon, onClick }: SideBarItemProps) => {
  return (
    <Link
      onClick={onClick}
      className="
        flex flex-row
        items-center
      "
      href={href}
    >
      <div className="
        relative 
        rounded-full 
        h-14 w-14 
        flex items-center justify-center
        hover:bg-slate-300
        hover:bg-opacity-10
        transition
        lg:hidden
      ">
        <Icon size={24} color="white" />
      </div>

      <div className="
        relative 
        hidden 
        lg:flex 
        items-center 
        gap-4 
        py-3 px-4
        rounded-full 
        hover:bg-slate-300 
        transition
        hover:bg-opacity-10"
      >
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-white">
          {label}
        </p>
      </div>
    </Link>
  )
}

export default SidebarItem;