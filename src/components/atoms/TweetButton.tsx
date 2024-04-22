import Link, { LinkProps } from "next/link";
import { FaFeather } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface TweetButtonProps extends Omit<LinkProps, "href"> {
  className?: string;
}

const TweetButton = (props: TweetButtonProps) => {
  return (
    <Link
      {...props}
      href="/"
      className={twMerge(
        `rounded-full 
          h-14
          p-4
          lg:w-full
          flex items-center justify-center 
          gap-2
          text-white font-bold
          bg-sky-500
          hover:bg-opacity-80 transition`,
        props.className
      )}
    >
      <FaFeather size={24} color="white" className="lg:hidden" />
      <span className="hidden lg:block">Tweet</span>
    </Link>
  );
};

export default TweetButton;
