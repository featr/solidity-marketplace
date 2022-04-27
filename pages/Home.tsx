import { Hero, Breadcrumbs } from "@components/common";
import { CourseList } from "@components/course";
import { BaseLayout } from "@components/layout";
import { OrderCard } from "@components/order";
import { EthRates, WalletBar } from "@components/web3";
import { CourseContent, getAllCourses } from "@content/courses/fetcher";

export default function Home({ courses }: { courses: CourseContent[] }) {
  return (
    <>
      <Hero />
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

Home.Layout = BaseLayout;
