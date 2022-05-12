import { useAccount } from "@components/hooks/web3/useAccount";
import { useNetwork } from "@components/hooks/web3/useNetwork";
import { CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { EthRates, WalletBar } from "@components/ui/web3";
import { CourseContent, getAllCourses } from "@content/courses/fetcher";

export default function Marketplace({ courses }: { courses: CourseContent[] }) {
  const { account } = useAccount();
  const { network } = useNetwork();
  return (
    <>
      <div className="py-4">
        <WalletBar address={account.data} network={network.data} />
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
