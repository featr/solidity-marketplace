import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
}

const ConnectButton = ({
  children,
  className = "text-white bg-indigo-600 hover:bg-indigo-700",
  ...rest
}: Props) => {
  return (
    <button
      {...rest}
      className={`px-8 py-3 border rounded-md text-base font-medium ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
};

export default ConnectButton;
