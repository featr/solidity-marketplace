import {
  useAccount,
  useOwnedCourse,
  useWalletInfo,
} from "@components/hooks/web3";
import { Modal } from "@components/ui/common";
import { CourseHero } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { CourseContent, getAllCourses } from "@content/courses/fetcher";
import { GetStaticPaths, GetStaticProps } from "next/types";

type ParamsSlug = {
  params: {
    slug: string;
  };
};

export default function Course({ course }: { course: CourseContent }) {
  const { hasLifetimeAccess } = useWalletInfo();
  const { account } = useAccount();
  const { ownedCourse } = useOwnedCourse(course, account);
  console.log("ownedCourse", ownedCourse);
  return (
    <>
      <CourseHero
        {...course}
        hasAccess={!!ownedCourse.data || hasLifetimeAccess}
      />
      {/* <Keypoints points={course.wsl} />
      <Curriculum locked={true} /> */}
      <Modal />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = getAllCourses();

  return {
    paths: data.map((c) => ({
      params: {
        slug: c.slug,
      },
    })) as ParamsSlug[],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: ParamsSlug) => {
  const { data } = getAllCourses();
  const course = data.filter((c) => c.slug === params.slug)[0];
  return {
    props: {
      course,
    },
  };
};

Course.Layout = BaseLayout;
