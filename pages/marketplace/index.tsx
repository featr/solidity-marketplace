import { useWalletInfo } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import { ConnectButton } from "@components/ui/common";
import { CourseCard, CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";
import { OrderModal } from "@components/ui/order";
import { CourseContent, getAllCourses } from "@content/courses/fetcher";
import { useState } from "react";

export default function Marketplace({ courses }: { courses: CourseContent[] }) {
  const { web3, contract } = useWeb3();
  const { canPurchaseCourse, account } = useWalletInfo();
  const [selectedCourse, setSelectedCourse] = useState<null | CourseContent>(
    null
  );

  const purchaseCourse = async (order) => {
    const hexCourseId = web3.utils.utf8ToHex(selectedCourse.id);

    const courseHash = web3.utils.soliditySha3(
      { type: "bytes16", value: hexCourseId },
      { type: "address", value: account.data }
    );

    const emailHash = web3.utils.sha3(order.email);

    const proof = web3.utils.soliditySha3(
      {
        type: "bytes32",
        value: emailHash,
      },
      {
        type: "bytes32",
        value: courseHash,
      }
    );

    const coursePrice = web3.utils.toWei(order.price.toString());

    try {
      await contract.methods
        .purchaseCourse(hexCourseId, proof)
        .send({ from: account.data, value: coursePrice });
    } catch {
      console.log("Purchase course: Operation has failed.");
    }
  };

  return (
    <>
      <MarketHeader />
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
          onSubmit={purchaseCourse}
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
