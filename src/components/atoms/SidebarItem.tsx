import useAuthModal from "@/hooks/useAuthModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import { IconType } from "react-icons";
import { useRouter } from "next/navigation";

export interface SideBarItemProps {
  label: string;
  href: string;
  icon: IconType;
  onClick?: () => void;
  isProtected?: boolean;
}
[];

const SidebarItem = ({
  label,
  href,
  icon: Icon,
  onClick,
  isProtected,
}: SideBarItemProps) => {
  const { push } = useRouter()
  const { onOpen } = useAuthModal();
  const { data } = useCurrentUser();

  const handleClick = () => {
    if (onClick) return onClick;

    if (isProtected && !data) {
      onOpen("login-modal");
    }

    if (href) {
      push(href);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="
        flex flex-row
        items-center
      "
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
    </button>
  );
};

export default SidebarItem;
