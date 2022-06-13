import { useWeb3 } from "@components/providers";
import { useAccount } from "@components/hooks/web3";
import Link from "next/link";
import { ReactElement } from "react";
import { ActiveLink, ConnectButton } from "..";
import { useRouter } from "next/router";

const Navbar = () => {
  const { connect, isLoading, requireInstall } = useWeb3();
  const { account } = useAccount();
  const { data, isAdmin } = account;
  const { pathname } = useRouter();
  const renderNavbarConnectButton = (): ReactElement => {
    if (isLoading) {
      return <ConnectButton disabled>Loading...</ConnectButton>;
    }
    if (data) {
      return (
        <ConnectButton className="cursor-default" hoverable={false}>
          Hi there {isAdmin && "Admin"}
        </ConnectButton>
      );
    }
    if (!requireInstall && !data) {
      return <ConnectButton onClick={connect}>Connect</ConnectButton>;
    }
    return (
      <ConnectButton
        onClick={() => window.open("https://metamask.io/download/", "_blank")}
      >
        Install Metamask
      </ConnectButton>
    );
  };
  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8 py-2">
        <nav className="relative" aria-label="Global">
          <div className="flex flex-col xs:flex-row justify-between items-center">
            <div>
              <ActiveLink href="/Home">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Home
                </a>
              </ActiveLink>
              <ActiveLink href="/marketplace">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Marketplace
                </a>
              </ActiveLink>
              <ActiveLink href="/blogs">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Blogs
                </a>
              </ActiveLink>
            </div>
            <div className="text-center">
              <ActiveLink href="/wishlist">
                <a className="font-medium mr-1 sm:mr-8 text-gray-500 hover:text-gray-900">
                  Wishlist
                </a>
              </ActiveLink>
              {renderNavbarConnectButton()}
            </div>
          </div>
        </nav>
      </div>
      {data && !pathname.includes("/marketplace") && (
        <div className="flex justify-end sm:px-6 lg:px-8">
          <div className="text-white bg-indigo-600 rounded-md p-1">{data}</div>
        </div>
      )}
    </section>
  );
};

export default Navbar;
