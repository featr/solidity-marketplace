import Image from "next/image";
import { useEthPrice } from "@components/hooks/useEthPrice";
import { ConnectButton, Loader } from "@components/ui/common";
import { useWeb3 } from "@components/providers";
import { ethers } from "ethers";

const EthRates = () => {
  const { eth } = useEthPrice();
  const {
    contracts: { passMinterContract },
    hasLifetimeAccess,
  } = useWeb3();

  const purchaseLifetimeAccess = async () => {
    try {
      const minterTested = await passMinterContract.mintNFT(
        process.env.NEXT_PUBLIC_NFT_URl,
        {
          value: ethers.utils.parseEther("0.5"),
        }
      );
      await minterTested.wait();
    } catch (e) {
      console.log("coudlnt fetch minter", e);
    }
  };
  return (
    <div className="flex flex-col xs:flex-row text-center">
      <div className="p-6 border drop-shadow rounded-md xs:mr-2">
        <div className="flex items-center justify-center">
          {eth.data ? (
            <>
              <Image
                layout="fixed"
                height={35}
                width={35}
                src="/small-eth.webp "
                alt="eth-logo"
              />
              <span className="text-xl font-bold"> = {eth.data}$</span>
            </>
          ) : (
            <div className="w-full flex justify-center">
              <Loader size="md" />
            </div>
          )}
        </div>
        <p className="text-lg text-gray-500">Current eth Price</p>
      </div>
      <div className="p-6 border drop-shadow rounded-md xs:mr-2">
        <div className="flex items-center justify-center mr-3">
          {eth.data ? (
            <>
              <Image
                layout="fixed"
                height={35}
                width={35}
                src="/small-eth.webp "
                alt="eth-logo"
              />
              <span className="text-xl font-bold">0.05</span>
            </>
          ) : (
            <div className="w-full flex justify-center">
              <Loader size="md" />
            </div>
          )}
        </div>
        <p className="text-lg text-gray-500">Price per article</p>
      </div>
      {!hasLifetimeAccess && (
        <ConnectButton variant="lightPurple" onClick={purchaseLifetimeAccess}>
          <div className="flex items-center justify-center mr-3">
            {eth.data ? (
              <>
                <Image
                  layout="fixed"
                  height={35}
                  width={35}
                  src="/small-eth.webp "
                  alt="eth-logo"
                />
                <span className="text-xl font-bold">0.5</span>
              </>
            ) : (
              <div className="w-full flex justify-center">
                <Loader size="md" />
              </div>
            )}
          </div>
          <p>Lifetime Access</p>
        </ConnectButton>
      )}
    </div>
  );
};

export default EthRates;
