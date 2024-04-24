import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ className, ...rest }) => {
  return (
    <>
      <input
        {...rest}
        className={twMerge(
          className,
          `
        w-full
        p-4
        text-lg
        bg-black
        border-2
        border-neutral-800
        rounded-md
        outline-none
        text-white
        focus:border-sky-500
        focus:boder-2
        transition
        disabled:bg-neutral-900
        disabled:opacity-70
        disabled:cursor-not-allowed
      `
        )}
      />
    </>
  );
};

export default Input;
