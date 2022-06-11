import Image from "next/image";
import { COURSE_PRICE, useEthPrice } from "@components/hooks/useEthPrice";
import { Loader } from "@components/ui/common";

const EthRates = () => {
  const { eth } = useEthPrice();
  return (
    <div className="flex flex-col xs:flex-row text-center">
      {/* <div className="flex flex-1 items-stretch text-center"> */}
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
      {/* </div> */}
      {/* <div className="flex flex-1 items-stretch text-center"> */}
      <div className="p-6 border drop-shadow rounded-md">
        <div className="flex items-center justify-center">
          {eth.data ? (
            <>
              <span className="text-xl font-bold">{eth.perItem}</span>
              <Image
                layout="fixed"
                height={35}
                width={35}
                src="/small-eth.webp "
                alt="eth-logo"
              />
              <span className="text-xl font-bold">= {COURSE_PRICE}$</span>
            </>
          ) : (
            <div className="w-full flex justify-center">
              <Loader size="md" />
            </div>
          )}
        </div>
        <p className="text-lg text-gray-500">Price per course</p>
      </div>
      {/* </div> */}
    </div>
  );
};

export default EthRates;
