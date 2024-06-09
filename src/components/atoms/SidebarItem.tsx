import useAuthModal from "@/hooks/useAuthModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import { IconType } from "react-icons";

export interface SideBarItemProps {
  label: string;
  href: string;
  icon: IconType;
  onClick?: () => void;
  isProtected?: boolean;
  alert?: boolean;
}
[];

const SidebarItem = ({
  label,
  href,
  icon: Icon,
  onClick,
  alert,
  isProtected,
}: SideBarItemProps) => {
  const { push } = useRouter();
  const { onOpen } = useAuthModal();
  const { data } = useCurrentUser();

  const handleClick = () => {
    if (onClick) return onClick();

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
        <div className="relative">
          <Icon size={24} color="white" />
          {alert ? (
            <div className="bg-sky-400 absolute -top-1.5 -right-1.5 border w-3.5 h-3.5 rounded-full border-black" />
          ) : null}
        </div>

        <span className="hidden lg:block text-white">{label}</span>
      </div>
    </button>
  );
};

export default SidebarItem;
