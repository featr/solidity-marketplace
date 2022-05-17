import { CourseContent } from "@content/courses/fetcher";
import Link from "next/link";
import Image from "next/image";
import React, { ReactElement, ReactNode } from "react";

const CourseCard = ({
  course,
  Footer,
}: {
  course: CourseContent;
  Footer?: () => ReactNode;
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="flex h-full">
        <div className="flex h-full">
          <Image
            className="object-cover"
            src={course.coverImage}
            alt={course.title}
            width={200}
            height={230}
            layout="fixed"
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {course.type}
          </div>
          <Link href={`/courses/${course.slug}`}>
            <a className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
              {course.title}
            </a>
          </Link>

          <p className="mt-2 text-gray-500">{course.description}</p>
          {Footer && Footer()}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
