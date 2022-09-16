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

const Home: NextPage = () => {
  const wallet = useAnchorWallet();

  /*CREATE TYPES FOR COURSES AND INSTRUCTORS*/
  const [courses, setCourses] = useState([] as any);
  const [instructors, setInstructors] = useState([] as any);

  const program = useMemo(() => {
    if (wallet) {
      const provider = new AnchorProvider(connection, wallet!, OPTS);
      return new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);
    }
  }, [wallet]);

  const getInstructors = useCallback(async () => {
    if (wallet && program) {
      try {
        const allInstructors = await program.account.instructor.all();
        console.log(allInstructors);

        setInstructors(allInstructors);
      } catch (error) {
        console.error(error);
      }
    }
  }, [wallet, program]);

  const getCourses = useCallback(async () => {
    if (wallet && program) {
      try {
        const allCourses = await program.account.course.all();
        console.log(allCourses);

        setCourses(allCourses);
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
          {instructors.map((instructor: any, index: number) => (
            <InstructorCard
              username={instructor.account.username}
              profilePicUrl={instructor.account.profilePicUrl}
              backgroundPicUrl={instructor.account.backgroundPicUrl}
              numFollowers={instructor.account.numFollowers}
              numFollowing={instructor.account.numFollowing}
              numCourses={instructor.account.numCourses}
              rating={instructor.account.rating}
              listNumber={index + 1}
              key={index}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
