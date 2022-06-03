import { useWalletInfo } from "@components/hooks/web3";
import { ConnectButton } from "@components/ui/common";
import { CourseCard, CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";
import { OrderModal } from "@components/ui/order";
import { CourseContent, getAllCourses } from "@content/courses/fetcher";
import { useState } from "react";

export default function Marketplace({ courses }: { courses: CourseContent[] }) {
  const [selectedCourse, setSelectedCourse] = useState<null | CourseContent>(
    null
  );
  const { canPurchaseCourse } = useWalletInfo();

  return (
    <>
      <div className="py-4">
        <MarketHeader />
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
