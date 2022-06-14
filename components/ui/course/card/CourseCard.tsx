import { CourseContent } from "@content/courses/fetcher";
import Link from "next/link";
import Image from "next/image";
import React, { ReactNode } from "react";

const CourseCard = ({
  course,
  Footer,
  disabled,
}: {
  course: CourseContent;
  Footer?: () => ReactNode;
  disabled?: boolean;
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="flex h-full">
        <div className="flex-1 h-full next-image-wrapper">
          <Image
            className={`object-cover ${disabled && "filter grayscale"} `}
            src={course.coverImage}
            alt={course.title}
            width={200}
            height={230}
            layout="responsive"
          />
        </div>
        <div className="p-8 pb-4 flex-2">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {course.type}
          </div>
          <Link href={`/articles/${course.slug}`}>
            <a className="h-12 block mt-1 text-sm sm:text-lg leading-tight font-medium text-black hover:underline">
              {course.title}
            </a>
          </Link>

          <p className="mt-2 text-sm sm:text-base text-gray-500">
            {course.previewText.substring(0, 70)}...
          </p>
          {Footer && Footer()}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
