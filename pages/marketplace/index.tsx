import { useAccount } from "@components/hooks/web3/useAccount";
import { Hero } from "@components/ui/common";
import { CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { EthRates, WalletBar } from "@components/ui/web3";
import { CourseContent, getAllCourses } from "@content/courses/fetcher";

export default function Marketplace({ courses }: { courses: CourseContent[] }) {
  const { account } = useAccount();
  return (
    <>
      <div className="py-4">
        <WalletBar address={account.data} />
      </div>

      <CourseList courses={courses} />
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
