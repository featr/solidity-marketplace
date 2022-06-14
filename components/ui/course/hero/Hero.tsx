import { ConnectButton, Message } from "@components/ui/common";
import { CourseContent } from "@content/courses/fetcher";
import Image from "next/image";
import React from "react";

const Hero = ({
  title,
  coverImage,
  hasAccess,
  previewText,
  id,
  fullTextParagraphs,
}: CourseContent & {
  hasAccess: boolean;
}) => {
  return (
    <section className="">
      {/* {hasAccess && <div>YOU OWN THIS COURSE</div>} */}
      {/* <div> */}
      <div className="py-10 px-20">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl text-center">
          <span className="xl:inline">
            {title.substring(0, title.length / 2)}
          </span>
          <span className="text-indigo-600 xl:inline">
            {title.substring(title.length / 2)}
          </span>
        </h1>

        <div className="mt-5">
          <Image
            className="object-contain"
            src={coverImage}
            alt={title}
            height={25}
            width={50}
            layout="responsive"
          />
        </div>
      </div>
      {/* </div> */}
      <div
        className={`min-h-16 flex flex-col pt-2 pb-8 px-6 mb-8 border rounded-lg bg-indigo-200`}
      >
        {/* <div className="flex-1"></div> */}
        {!hasAccess ? (
          <p key={id} className={`mt-3 text-gray-600 blurred-section`}>
            {previewText}
          </p>
        ) : (
          fullTextParagraphs.map((p, i) => (
            <p key={id + i} className={`mt-3 text-gray-600`}>
              {p}
            </p>
          ))
        )}

        {!hasAccess && (
          <Message type="indigo" className="mt-auto" closable={false}>
            <p>You don&#39;t have access to read this article.</p>
            <p>
              {" "}
              If you wish to continue reading - please{" "}
              <ConnectButton
                className="bg-indigo-900 underline"
                hoverable={false}
              >
                <i>Purchase</i>
              </ConnectButton>{" "}
              the article
            </p>
          </Message>
        )}
      </div>
    </section>
  );
};
export default Hero;
