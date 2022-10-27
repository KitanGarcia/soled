import React, { useMemo } from 'react';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import CourseCard from './CourseCard';
import { useCourses } from '../hooks/useCourses';

export default function CourseGrid() {
  const wallet = useAnchorWallet();

  const courses = useCourses();

  // const addCourse = async () => {
  //   if (wallet && program) {
  //     const newCourse = anchor.web3.Keypair.generate();
  //     console.log(newCourse.publicKey);

  //     const title = "test title";
  //     const rating = "Promising";
  //     const price = 1;
  //     const lessons = 10;
  //     const thumbnail_url = "https://media1.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif?cid=ecf05e475x0rqm5t7hnj83gtjsv1q0wxymurck3yj16rlk2x&rid=giphy.gif&ct=g";

  //     try {
  //       await program.rpc.createCourse(
  //         title,
  //         rating,
  //         price,
  //         lessons,
  //         thumbnail_url,
  //         {
  //         accounts: {
  //           authority: wallet!.publicKey,
  //           course: newCourse.publicKey,
  //           systemProgram: anchor.web3.SystemProgram.programId,
  //         },
  //         signers: [newCourse]
  //       });

  //       await getCourses();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }

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
