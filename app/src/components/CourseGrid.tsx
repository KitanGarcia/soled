import React, { useMemo } from 'react';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import CourseCard from './CourseCard';
import { useCourses } from '../hooks/useCourses';

export default function CourseGrid() {
  const wallet = useAnchorWallet();
  const courses = useCourses();
  console.log('All Courses:', courses);

  return (
    <>
      {wallet && courses && (
        <div>
          <h1 className="ml-10 font-bold leading-7 text-2xl mb-2 text-main-text">
            FEATURED COURSES{' '}
          </h1>
          <div className="place-content-center flex flex-wrap p-5 gap-4">
            {courses.map((course: any, index: number) => (
              <div key={`${course.title}_${index}`}>
                <CourseCard
                  authority={course.authority}
                  publicKey={course.publicKey}
                  title={course.title}
                  rating={course.rating}
                  price={course.price}
                  numLessons={course.lessons}
                  thumbnailUrl={course.thumbnailUrl}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
