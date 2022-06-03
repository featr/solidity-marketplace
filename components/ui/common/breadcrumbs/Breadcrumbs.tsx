import { BreadcrumbLink } from "@components/ui/marketplace/header";
import Link from "next/link";
import { ActiveLink } from "..";

const Breadcrumbs = ({ items }: { items: BreadcrumbLink[] }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex leading-none text-indigo-600 divide-x divide-indigo-400">
        {items.map((item, index) => (
          <li
            className={`${
              index === 0 ? "pr-4" : "px-4"
            } font-medium text-gray-500 hover:text-gray-900`}
            key={item.href}
          >
            <ActiveLink href={item.href}>
              <a>{item.value}</a>
            </ActiveLink>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
