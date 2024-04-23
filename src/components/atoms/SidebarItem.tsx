import Link from "next/link";
import { IconType } from "react-icons";

export interface SideBarItemProps {
  label: string;
  href: string;
  icon: IconType;
  onClick?: () => void;
}
[];

const SidebarItem = ({
  label,
  href,
  icon: Icon,
  onClick,
}: SideBarItemProps) => {
  return (
    <Link
      onClick={onClick}
      className="
        flex flex-row
        items-center
      "
      href={href}
    >
      <div
        className="
        relative 
        rounded-full 
        h-14 w-14 lg:w-auto
        lg:py-3 lg:px-4
        gap-4
        flex items-center justify-center
        hover:bg-slate-300
        hover:bg-opacity-10
        transition
      "
      >
        <Icon size={24} color="white" />

        <span className="hidden lg:block text-white">{label}</span>
      </div>
    </Link>
  );
};

export default SidebarItem;
