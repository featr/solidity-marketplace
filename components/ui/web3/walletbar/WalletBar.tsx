import { useWalletInfo } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import { ConnectButton } from "@components/ui/common";

const WalletBar = () => {
  const { account, network } = useWalletInfo();

  const { requireInstall } = useWeb3();
  return (
    <section className="text-white bg-indigo-600 rounded-lg">
      <div className="p-8">
        <h1 className="text-base xs:text-xl break-words">
          Hello, {account.data}
        </h1>
        <h2 className="subtitle mb-5 text-sm xs:text-base">
          I hope you are having a great day!
        </h2>
        <div className="flex justify-between items-center">
          <div className="sm:flex sm:justify-center lg:justify-start">
            <ConnectButton variant="white" className="mr-2 text-sm xs:text-lg p-2">Learn how to purchase</ConnectButton>
            {/* <div className="rounded-md shadow">
              <a
                href="#"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10"
              >
                Learn how to purchase
              </a>
            </div> */}
          </div>
          <div>
            {network.hasBeenInit && !network.isSupported && (
              <div className="bg-red-400 p-4 rounded-lg">
                <div>Connected to wrong Network</div>
                <div>
                  Connect to : {``}
                  <strong className="text-2xl">{network.target}</strong>
                </div>
              </div>
            )}
            {requireInstall && (
              <div className="bg-yellow-400 p-4 rounded-lg">
                Cannot connect to network. Please install Metamask.
              </div>
            )}
            {network.data && (
              <div>
                <span>Currently on </span>
                <strong className="text-2xl">{network.data}</strong>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WalletBar;
