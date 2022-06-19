import { ethers } from "ethers";
import { useWalletInfo } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import { ConnectButton } from "@components/ui/common";
import { CourseCard, CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";
import { OrderModal } from "@components/ui/order";
import { CourseContent, getAllCourses } from "@content/courses/fetcher";
import { useState } from "react";
import { useRouter } from "next/router";
import { createArticleHash } from "@utils/hash";

export default function Marketplace({ courses }: { courses: CourseContent[] }) {
  const { contract } = useWeb3();
  const { canPurchaseCourse, account } = useWalletInfo();
  const router = useRouter();
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<null | CourseContent>(
    null
  );

  const purchaseCourse = async (order) => {
    const articleIdHash = ethers.utils.id(selectedCourse.id);

    const articleHash = createArticleHash(selectedCourse.id, account.data);
    const emailHash = ethers.utils.id(order.email);

    const proof = ethers.utils.solidityKeccak256(
      ["bytes32", "bytes32"],
      [emailHash, articleHash]
    );

    const coursePrice = ethers.utils.parseEther(order.price.toString());

    try {
      setIsPurchasing(true);
      const tx = await contract.purchaseArticle(articleIdHash, proof, {
        value: coursePrice,
      });
      await tx.wait();
      setIsPurchasing(false);
      setSelectedCourse(null);
      router.push("/marketplace/articles/owned");
    } catch (e) {
      setIsPurchasing(false);
      console.log(e, "Purchase course: Operation has failed.");
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
          onSubmitLoading={isPurchasing}
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
