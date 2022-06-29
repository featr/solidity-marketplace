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

export type TSubmitOrderInfo = {
  loading: boolean;
  error: boolean;
};

export default function Marketplace({ courses }: { courses: CourseContent[] }) {
  const {
    contracts: { articleMarketplaceContract },
    hasLifetimeAccess,
  } = useWeb3();
  const { canPurchaseCourse, account } = useWalletInfo();
  const router = useRouter();
  const [orderInfo, setOrderInfo] = useState<TSubmitOrderInfo>({
    loading: false,
    error: false,
  });
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

    const coursePrice = ethers.utils.parseEther("0.05");

    try {
      setOrderInfo((prev) => ({ ...prev, loading: true }));
      const tx = await articleMarketplaceContract.purchaseArticle(
        articleIdHash,
        proof,
        {
          value: coursePrice,
        }
      );
      await tx.wait();
      setOrderInfo({ error: false, loading: false });
      setSelectedCourse(null);
      router.push("/marketplace/articles/owned");
    } catch (e) {
      setOrderInfo({ error: true, loading: false });
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
                {hasLifetimeAccess ? (
                  <ConnectButton
                    onClick={() => router.push(`/articles/${course.slug}`)}
                  >
                    Read the article
                  </ConnectButton>
                ) : (
                  <ConnectButton
                    onClick={() => setSelectedCourse(course)}
                    disabled={!canPurchaseCourse}
                    variant="lightPurple"
                  >
                    Purchase
                  </ConnectButton>
                )}
              </div>
            )}
          />
        )}
      </CourseList>
      {selectedCourse && (
        <OrderModal
          onSubmitInfo={orderInfo}
          course={selectedCourse}
          onClose={() => {
            setSelectedCourse(null);
            setOrderInfo({ loading: false, error: false });
          }}
          onSubmit={purchaseCourse}
          ƒ={undefined}
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
