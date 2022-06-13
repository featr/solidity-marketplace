import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
  variant?: string;
  hoverable?: boolean;
}

const ConnectButton = ({
  children,
  className,
  variant = "purple",
  hoverable = true,
  ...rest
}: Props) => {
  const variants = {
    purple: `text-white bg-indigo-600 ${hoverable && "hover:bg-indigo-700"}`,
    red: "text-white bg-red-600 hover:bg-red-700",
    lightPurple: `text-indigo-700 bg-indigo-100 ${hoverable && "hover:bg-indigo-200"}`,
    white: `text-black bg-white`
  };
  return (
    <button
      {...rest}
      className={`xs:px-8 xs:py-3 p-2 border rounded-md text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed ${className} ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

export default ConnectButton;
