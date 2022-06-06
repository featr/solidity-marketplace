import { ConnectButton, Message } from "@components/ui/common";
import { OwnedCourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";
import React from "react";

const OwnedCourses = () => {
  return (
    <>
      <div className="py-4">
        <MarketHeader />
      </div>
      <section className="grid grid-cols-1">
        <OwnedCourseCard>
          <Message>Success</Message>
          <ConnectButton>Watch the course</ConnectButton>
        </OwnedCourseCard>
      </section>
    </>
  );
};
OwnedCourses.Layout = BaseLayout;
export default OwnedCourses;
