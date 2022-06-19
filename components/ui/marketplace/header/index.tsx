import { Breadcrumbs } from "@components/ui/common";
import { EthRates, WalletBar } from "@components/ui/web3";

export type BreadcrumbLink = {
  href: string;
  value: string;
};

const LINKS: BreadcrumbLink[] = [
  {
    href: "/marketplace",
    value: "Buy",
  },
  {
    href: "/marketplace/articles/owned",
    value: "My Articles",
  },
  // {
  //   href: "/marketplace/articles/manage",
  //   value: "Manage Articles",
  // },
];

const Header = () => {
  return (
    <>
      <div className="pt-4">
        <WalletBar />
      </div>
      <EthRates />
      <div className="flex flex-row-reverse p-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={LINKS} />
      </div>
    </>
  );
};

export default Header;
