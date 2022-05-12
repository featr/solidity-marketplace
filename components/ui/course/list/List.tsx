import { CourseContent } from "@content/courses/fetcher";
import { ReactNode } from "react";

const List = ({
  courses,
  children,
}: {
  courses: CourseContent[];
  children?: (course: CourseContent) => ReactNode;
}) => {
  return (
    <section className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
      {courses.map((course) => children(course))}
    </section>
  );
};

export default List;
