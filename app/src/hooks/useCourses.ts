import { createContext, useContext } from 'react';
import { Course } from '../../types/Course';

export const CoursesContext = createContext<Array<Course> | undefined>(
  undefined
);

export const useCourses = () => {
  let context = useContext(CoursesContext);
  if (context === undefined) {
    throw Error('Context is undefined');
  }
  return context;
};
