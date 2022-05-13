import { useAccount } from "@components/hooks/web3/useAccount";
import { useNetwork } from "@components/hooks/web3/useNetwork";
import { CourseCard, CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { EthRates, WalletBar } from "@components/ui/web3";
import { CourseContent, getAllCourses } from "@content/courses/fetcher";

export default function Marketplace({ courses }: { courses: CourseContent[] }) {
  const { account } = useAccount();
  const { network } = useNetwork();
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
      </div>

      <CourseList courses={courses}>
        {(course) => <CourseCard course={course} key={course.id} />}
      </CourseList>
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
