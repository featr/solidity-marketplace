import { Modal } from "@components/ui/common";
import { CourseHero, Curriculum, Keypoints } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { CourseContent, getAllCourses } from "@content/courses/fetcher";
import { GetStaticPaths, GetStaticProps } from "next/types";

type ParamsSlug = {
  params: {
    slug: string;
  };
};

export default function Course({ course }: { course: CourseContent }) {
  return (
    <>
      <CourseHero
        title={course.title}
        description={course.description}
        image={course.coverImage}
      />
      <Keypoints points={course.wsl} />
      <Curriculum locked={true} />
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
