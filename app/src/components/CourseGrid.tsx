import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { AnchorProvider } from '@project-serum/anchor';
import * as anchor from '@project-serum/anchor';

import CourseCard from './CourseCard';
import IDL from '../../../target/idl/soled.json';
import { Course } from '../../types/Course';
import { connection, OPTS, PROGRAM_ID } from '../../utils/Connection';

export default function CourseGrid() {
  const wallet = useAnchorWallet();

  const [courses, setCourses] = useState<Array<Course>>([]);

  const program = useMemo(() => {
    if (wallet) {
      const provider = new AnchorProvider(connection, wallet!, OPTS);
      return new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);
    }
  }, [wallet]);

  const getCourses = useCallback(async () => {
    if (wallet && program) {
      try {
        const allCourses = await program.account.course
          .all()
          .then((courses) => courses.map((course) => course.account));

        setCourses(allCourses as Course[]);
      } catch (error) {
        console.error(error);
      }
    }
  }, [wallet, program]);

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

  useEffect(() => {
    if (wallet && program) {
      getCourses();
    }
  }, [wallet, program, getCourses]);

  return (
    <div className="place-content-center flex flex-wrap p-5 gap-4">
      {wallet &&
        courses &&
        courses.map((course: any, index: number) => (
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
  );
}
