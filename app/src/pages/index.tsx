import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { AnchorProvider } from '@project-serum/anchor';
import * as anchor from '@project-serum/anchor';
import type { NextPage } from 'next';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from '../styles/Home.module.css';
import { connection, OPTS, PROGRAM_ID } from '../../utils/Connection';
import IDL from '../../../target/idl/soled.json';

import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';
import InstructorCard from '../components/InstructorCard';
import { Course } from '../../types/Course';
import { Instructor } from '../../types/Instructor';

const Home: NextPage = () => {
  const wallet = useAnchorWallet();

  /*CREATE TYPES FOR COURSES AND INSTRUCTORS*/
  const [courses, setCourses] = useState<Array<Course>>([]);
  const [instructors, setInstructors] = useState<Array<Instructor>>([]);

  const program = useMemo(() => {
    if (wallet) {
      const provider = new AnchorProvider(connection, wallet!, OPTS);
      return new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);
    }
  }, [wallet]);

  const getInstructors = useCallback(async () => {
    if (wallet && program) {
      try {
        const allInstructors = await program.account.instructor
          .all()
          .then((instructors) =>
            instructors.map((instructor) => instructor.account)
          );
        console.log(allInstructors);

        setInstructors(allInstructors as Instructor[]);
      } catch (error) {
        console.error(error);
      }
    }
  }, [wallet, program]);

  const getCourses = useCallback(async () => {
    if (wallet && program) {
      try {
        const allCourses = await program.account.course
          .all()
          .then((courses) => courses.map((course) => course.account));
        console.log(allCourses);

        setCourses(allCourses as Course[]);
      } catch (error) {
        console.error(error);
      }
    }
  }, [wallet, program]);

  useEffect(() => {
    if (wallet && program) {
      getCourses();
      getInstructors();
    }
  }, [wallet, program, getCourses, getInstructors]);

  return (
    <div className={styles.container}>
      <NavBar></NavBar>
      <main className={styles.main}>
        <div className="ml-10 mb-16 w-2/6">
          <h1 className="font-bold leading-9 text-2xl mb-2 text-main-text">
            TOP INSTRUCTORS THIS MONTH
          </h1>
          <p>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim minim mollit.
          </p>
        </div>
        <div className="flex flex-row justify-evenly">
          {instructors.map((instructor: Instructor, index: number) => (
            <InstructorCard
              username={instructor.username}
              profilePicUrl={instructor.profilePicUrl}
              backgroundPicUrl={instructor.backgroundPicUrl}
              numFollowers={instructor.numFollowers}
              numFollowing={instructor.numFollowing}
              numCourses={instructor.numCourses}
              rating={instructor.rating}
              listNumber={index + 1}
              key={`${instructor.username}_${index}`}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
