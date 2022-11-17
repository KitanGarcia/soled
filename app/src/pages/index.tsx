import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { AnchorProvider } from '@project-serum/anchor';
import * as anchor from '@project-serum/anchor';
import type { NextPage } from 'next';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from '../styles/Home.module.css';
import { connection, OPTS, PROGRAM_ID } from '../utils/Connection';
import IDL from '../../../target/idl/soled.json';
import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';
import InstructorCard from '../components/InstructorCard';
import { Instructor } from '../types/Instructor';
import CourseGrid from '../components/CourseGrid';
import ArticleCard from '../components/ArticleCard';
import { useInstructors } from '../hooks/useInstructors';

const Home: NextPage = () => {
  const wallet = useAnchorWallet();
  const allInstructors = useInstructors();
  const [instructorGrid, setInstructorGrid] = useState<
    Array<Array<Instructor>>
  >([[]]);
  const [showExploreAll, setShowExploreAll] = useState(false);

  const program = useMemo(() => {
    if (wallet) {
      const provider = new AnchorProvider(connection, wallet!, OPTS);
      return new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);
    }
  }, [wallet]);

  const getInstructors = useCallback(async () => {
    if (wallet && program) {
      console.log('All Instructors', allInstructors);

      try {
        // Only give link to view all instructors if there are more than 12
        // Ie. if not instructors get rendered on this page
        setShowExploreAll(allInstructors.length > 12 ? true : false);

        // Organize instructors in grid with rows of 3 cards or less
        // Only render a max of 12 cards
        let grid = [];
        let row = [];
        const maxCards =
          allInstructors.length >= 12 ? 12 : allInstructors.length;

        for (let i = 0; i < maxCards; i++) {
          row.push(allInstructors[i]);
          if ((i + 1) % 3 === 0 || i === allInstructors.length - 1) {
            grid.push(row);
            row = [];
          }
        }
        setInstructorGrid(grid as Array<Array<Instructor>>);
      } catch (error) {
        console.error(error);
      }
    }
  }, [wallet, program, allInstructors]);

  useEffect(() => {
    if (wallet && program) {
      getInstructors();
    }
  }, [wallet, program, getInstructors]);

  return (
    <div className="bg-bg-color text-main-text">
      <NavBar></NavBar>
      <main className={styles.main}>
        <div className="w-full">
          <CourseGrid />
        </div>

        {wallet && (
          <div className="w-full mt-12">
            <h1 className="ml-10 font-bold leading-7 text-2xl mb-2 text-main-text">
              ARTICLES{' '}
            </h1>
            <div className="flex flex-col items-center justify-center">
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
            </div>
          </div>
        )}

        {wallet && instructorGrid && (
          <>
            <div className="w-full">
              <div className="mt-24 ml-10 mb-16 w-2/6">
                <h1 className="font-bold leading-7 text-2xl mb-2 text-main-text">
                  TOP INSTRUCTORS THIS{' '}
                  <strong className="text-transparent bg-clip-text bg-gradient-to-br from-solana-start to-solana-end">
                    MONTH
                  </strong>
                </h1>
                <p>
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis enim minim mollit.
                </p>
              </div>
              <div className="flex flex-col justify-evenly">
                {instructorGrid.map((cols, rowIndex) => (
                  <div className="flex justify-center mb-12" key={rowIndex}>
                    {cols.map((instructor, colIndex) => (
                      <InstructorCard
                        username={instructor.username}
                        profilePicUrl={instructor.profilePicUrl}
                        backgroundPicUrl={instructor.backgroundPicUrl}
                        numFollowers={instructor.numFollowers}
                        numFollowing={instructor.numFollowing}
                        numCourses={instructor.numCourses}
                        rating={instructor.rating}
                        listNumber={rowIndex * 3 + colIndex + 1}
                        key={`${instructor.username}_${
                          rowIndex * 3 + colIndex + 1
                        }`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            {showExploreAll && (
              <div className="flex justify-center align-center">
                <button className="inline-flex w-1/8 justify-center rounded-md border border-card-border-color-start bg-like-btn px-12 py-2 font-medium shadow-sm hover:bg-gradient-to-br hover:from-solana-start hover:to-solana-end hover:border-transparent hover:text-main-text">
                  Explore All
                </button>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
