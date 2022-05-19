import { SWRResponse } from "swr";
import Image from "next/image";

const EthRates = ({
  ethPrice,
  costPerItem,
}: {
  ethPrice: number;
  costPerItem: string;
}) => {
  return (
    <div className="grid grid-cols-4 mb-5">
      <div className="flex flex-1 items-stretch text-center">
        <div className="p-10 border drop-shadow rounded-md">
          <div className="flex">
            <Image
              layout="fixed"
              height={35}
              width={35}
              src="/small-eth.webp "
              alt="eth-logo"
            />
            <span className="text-2xl font-bold"> = {ethPrice}$</span>
          </div>
          <p className="text-xl text-gray-500">Current eth Price</p>
        </div>
      </div>
      <div className="flex flex-1 items-stretch text-center">
        <div className="p-10 border drop-shadow rounded-md">
          <div className="flex">
            <span className="text-2xl font-bold">{costPerItem}</span>
            <Image
              layout="fixed"
              height={35}
              width={35}
              src="/small-eth.webp "
              alt="eth-logo"
            />
            <span className="text-2xl font-bold">= 15$</span>
          </div>
          <p className="text-xl text-gray-500">Price per course</p>
        </div>
      </div>
    </div>
  );
};

export default EthRates;
