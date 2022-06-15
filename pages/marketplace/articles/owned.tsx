import { useAccount, useOwnedCourses } from "@components/hooks/web3";
import { ConnectButton, Message } from "@components/ui/common";
import { OwnedCourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";
import { CourseContent, getAllCourses } from "@content/courses/fetcher";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import Link from "next/link";
import { useWeb3 } from "@components/providers";

const OwnedCourses = ({ courses }: { courses: CourseContent[] }) => {
  const { account } = useAccount();
  const router = useRouter();
  const { requireInstall } = useWeb3();
  const { ownedCourses } = useOwnedCourses(courses, account);
  const isCoursesEmpty = useMemo(() => {
    return ownedCourses.hasInitialResponse && ownedCourses?.data?.length === 0;
  }, [ownedCourses]);
  const isAccountEmpty = useMemo(() => {
    return account.hasInitialResponse && !account.data;
  }, [account]);
  return (
    <>
      <MarketHeader />
      <section className="grid grid-cols-1">
        {isCoursesEmpty && (
          <div>
            <Message type="warning">
              <div>You don&#39;t own any articles</div>
              <Link href="/marketplace">
                <a className="font-normal hover:underline">
                  <i className="bg-yellow-100">Purchase Articles</i>
                </a>
              </Link>
            </Message>
          </div>
        )}
        {isAccountEmpty && (
          <div>
            <Message type="warning">
              <div>Please connect to Metamask</div>
            </Message>
          </div>
        )}
        {requireInstall && (
          <div>
            <Message type="warning">
              <div>Please install to Metamask</div>
            </Message>
          </div>
        )}
        {ownedCourses.data &&
          ownedCourses.data.map((course) => (
            <OwnedCourseCard key={course.id} course={course}>
              <ConnectButton
                onClick={() => router.push(`/articles/${course.slug}`)}
              >
                Read the article
              </ConnectButton>
            </OwnedCourseCard>
          ))}
      </section>
    </>
  );
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
