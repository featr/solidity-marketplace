import { useWeb3 } from "@components/providers";
import { Hero, Breadcrumbs } from "@components/ui/common";
import { CourseList, CourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { EthRates, WalletBar } from "@components/ui/web3";
import { CourseContent, getAllCourses } from "@content/courses/fetcher";

export default function Home({ courses }: { courses: CourseContent[] }) {
  return (
    <>
      <Hero />
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

Home.Layout = BaseLayout;
