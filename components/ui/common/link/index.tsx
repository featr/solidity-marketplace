import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";

interface IWithChildrenWithProps {
  children: ReactElement;
}

interface IProps extends IWithChildrenWithProps {
  href: string;
  activeLinkClass?: string;
}

const ActiveLink = ({ children, activeLinkClass, ...props }: IProps) => {
  const { pathname } = useRouter();
  let className = children.props.className || "";
  if (pathname === props.href) {
    className = `${className} ${
      activeLinkClass ? activeLinkClass : "text-indigo-600"
    }`;
  }
  return (
    <Link {...props}>{React.cloneElement(children as any, { className })}</Link>
  );
};

export default ActiveLink;
