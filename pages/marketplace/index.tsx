import { useEthPrice } from "@components/hooks/useEthPrice";
import { useAccount, useNetwork } from "@components/hooks/web3";
import { ConnectButton } from "@components/ui/common";
import { CourseCard, CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { OrderModal } from "@components/ui/order";
import { EthRates, WalletBar } from "@components/ui/web3";
import { CourseContent, getAllCourses } from "@content/courses/fetcher";
import { useState } from "react";

export default function Marketplace({ courses }: { courses: CourseContent[] }) {
  const [selectedCourse, setSelectedCourse] = useState<null | CourseContent>(
    null
  );
  const { account } = useAccount();
  const { network } = useNetwork();
  const { eth } = useEthPrice();

  const canPurchaseCourse = !!(account.data && network.isSupported);

  return (
    <>
      <div className="py-4">
        <WalletBar
          address={account.data}
          network={{
            data: network.data,
            target: network.target,
            isSupported: network.isSupported,
            hasBeenInit: network.hasBeenInit,
          }}
        />
        <EthRates ethPrice={eth.data} costPerItem={eth.perItem} />
      </div>

      <CourseList courses={courses}>
        {(course) => (
          <CourseCard
            course={course}
            disabled={!canPurchaseCourse}
            key={course.id}
            Footer={() => (
              <div className="mt-4">
                <ConnectButton
                  onClick={() => setSelectedCourse(course)}
                  disabled={!canPurchaseCourse}
                  variant="lightPurple"
                >
                  Purchase
                </ConnectButton>
              </div>
            )}
          />
        )}
      </CourseList>
      {selectedCourse && (
        <OrderModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        ></OrderModal>
      )}
    </>
  );
}

export const getStaticProps = () => {
  const { data } = getAllCourses();
  return {
    props: {
      courses: data,
    },
  };
};
Marketplace.Layout = BaseLayout;
