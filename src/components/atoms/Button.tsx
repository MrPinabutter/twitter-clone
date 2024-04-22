import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  secondary,
  fullWidth,
  large,
  outline,
  ...rest
}) => {
  return (
    <button
      className={twMerge(
        "disabled:opacity-70 disabled:cursor-not-allowed rounded-full font-semibold hover:opacity-80 transition border-2",
        fullWidth ? "w-full" : "w-fit",
        secondary
          ? "bg-white text-black border-black"
          : "bg-sky-500 text-white border-sky-500",
        large ? "text-lg px-5 py-3" : "text-mg px-4 py-2",
        outline ? "bg-transparent border-white text-white" : ""
      )}
      {...rest}
    >
      {label}
    </button>
  );
};

export default Button;
