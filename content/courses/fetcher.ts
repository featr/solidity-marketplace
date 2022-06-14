import courses from "./index.json";

export type CourseContent = {
  id: string;
  type: string;
  title: string;
  description?: string;
  previewText: string;
  fullTextParagraphs: string[];
  coverImage: string;
  author: string;
  link: string;
  slug: string;
  wsl: string[];
  createdAt: string;
};

export type GetCoursesReturnStruc = {
  data: CourseContent[];
  courseMap: Record<string, CourseContent>;
};

export const getAllCourses = (): GetCoursesReturnStruc => {
  return {
    data: courses as CourseContent[],
    courseMap: courses.reduce((a, c, i) => {
      a[c.id] = c;
      a[c.id].index = i;
      return a;
    }, {}),
  };
};
