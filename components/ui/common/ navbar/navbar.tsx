import { useWeb3 } from "@components/providers";
import { useAccount } from "@components/web3/hooks/useAccount";
import Link from "next/link";
import { ConnectButton } from "..";

const Navbar = () => {
  const { connect, isWeb3Loaded, isLoading } = useWeb3();
  const { accounts } = useAccount();
  return (
    <section>
      {accounts}
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8 py-4">
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
              {isLoading ? (
                <ConnectButton onClick={connect} disabled>
                  Loading...
                </ConnectButton>
              ) : isWeb3Loaded ? (
                <ConnectButton onClick={connect}>Connect</ConnectButton>
              ) : (
                <ConnectButton
                  onClick={() =>
                    window.open("https://metamask.io/download/", "_blank")
                  }
                >
                  Install Metamask
                </ConnectButton>
              )}
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
