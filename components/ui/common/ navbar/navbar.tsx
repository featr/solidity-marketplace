import { useWeb3 } from "@components/providers";
import { useAccount } from "@components/web3/hooks/useAccount";
import Link from "next/link";
import { ReactElement } from "react";
import { ConnectButton } from "..";

const Navbar = () => {
  const { connect, isWeb3Loaded, isLoading } = useWeb3();
  const { account } = useAccount();
  const { data, isAdmin } = account;

  const renderNavbarConnectButton = (): ReactElement => {
    if (isLoading) {
      return <ConnectButton disabled>Loading...</ConnectButton>;
    }
    if (isWeb3Loaded && data) {
      return (
        <ConnectButton className="cursor-default" hoverable={false}>
          Hi there {isAdmin && "Admin"}
        </ConnectButton>
      );
    }
    if (isWeb3Loaded && !data) {
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
          <div className="flex justify-between items-center">
            <div>
              <Link href="/Home">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Home
                </a>
              </Link>
              <Link href="/Home">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Marketplace
                </a>
              </Link>
              <Link href="/Home">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Blogs
                </a>
              </Link>
            </div>
            <div>
              <Link href="/Home">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Wishlist
                </a>
              </Link>
              {renderNavbarConnectButton()}
            </div>
          </div>
        </nav>
      </div>
      {data && (
        <div className="flex justify-end sm:px-6 lg:px-8">
          <div className="text-white bg-indigo-600 rounded-md p-1">{data}</div>
        </div>
      )}
    </section>
  );
};

export default Navbar;
