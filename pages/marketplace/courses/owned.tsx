import { useAccount, useOwnedCourses } from "@components/hooks/web3";
import { ConnectButton, Message } from "@components/ui/common";
import { OwnedCourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";
import { CourseContent, getAllCourses } from "@content/courses/fetcher";
import React from "react";

const OwnedCourses = ({ courses }: { courses: CourseContent[] }) => {
  const { account } = useAccount();
  const { ownedCourses } = useOwnedCourses(courses, account);
  return (
    <>
      <div className="py-4">
        <MarketHeader />
      </div>
      <section className="grid grid-cols-1">
        {ownedCourses.data &&
          ownedCourses.data.map((course) => (
            <OwnedCourseCard key={course.id} course={course}>
              {/* <Message>Success</Message> */}
              <ConnectButton>Watch the course</ConnectButton>
            </OwnedCourseCard>
          ))}
      </section>
    </>
  )
};

OwnedCourses.Layout = BaseLayout;

export const getStaticProps = () => {
  const { data } = getAllCourses();
  return {
    props: {
      courses: data,
    },
  };
};
export default OwnedCourses;
