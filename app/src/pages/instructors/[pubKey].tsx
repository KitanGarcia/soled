import { useEffect, useMemo, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import * as Web3 from '@solana/web3.js';
import * as anchor from '@project-serum/anchor';
import { AnchorProvider } from '@project-serum/anchor';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { connection, OPTS, PROGRAM_ID } from '../../utils/Connection';
import IDL from '../../utils/soled.json';

import styles from '../../styles/Home.module.css';
import NavBar from '../../components/layout/NavBar';
import Footer from '../../components/layout/Footer';
import { Instructor } from '../../types/Instructor';
import { Course } from '../../types/Course';

// Replace with proper loading skeletons
const temporaryLoaderURL =
  'https://media.tenor.com/guhB4PpjrmUAAAAM/loading-loading-gif.gif';

const InstructorPage: NextPage = () => {
  const router = useRouter();
  const [instructor, setInstructor] = useState<Instructor>();
  const [instructorPubKey, setInstructorPubKey] =
    useState<anchor.web3.PublicKey>();
  const [coursesAndPubKeys, setCoursesAndPubKeys] = useState<
    { course: Course; pubkey: String }[]
  >([]);
  const wallet = useAnchorWallet();

  const program = useMemo(() => {
    if (wallet) {
      const provider = new AnchorProvider(connection, wallet!, OPTS);
      return new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);
    }
  }, [wallet]);

  useEffect(() => {
    const getInstructorPubKey = async () => {
      if (program && router.query.pubKey) {
        const pubKey = new Web3.PublicKey(router.query.pubKey);

        const instructorSeeds = [Buffer.from('instructor'), pubKey.toBuffer()];
        const [instructorPubKey, _] =
          await anchor.web3.PublicKey.findProgramAddress(
            instructorSeeds,
            program.programId
          );

        if (instructorPubKey) {
          const fetchedInstructor = await program.account.instructor.fetch(
            instructorPubKey
          );
          setInstructorPubKey(instructorPubKey);
          setInstructor(fetchedInstructor as Instructor);
          console.log(fetchedInstructor);
        }
      }
    };

    getInstructorPubKey();
  }, [program, router.query]);

  useEffect(() => {
    if (program && instructorPubKey && instructor) {
      const getCourses = async () => {
        let fetchedCourses = [];
        for (let i = 0; i <= instructor.numCourses; i++) {
          const courseSeeds = [
            instructorPubKey.toBuffer(),
            Buffer.from('course'),
            Buffer.from(`${i}`),
          ];

          const [coursePubKey] = await anchor.web3.PublicKey.findProgramAddress(
            courseSeeds,
            program.programId
          );

          try {
            const course = await program.account.course.fetch(coursePubKey);
            fetchedCourses.push({
              course: course as Course,
              pubkey: coursePubKey.toString(),
            });
          } catch (error) {
            console.log('Could not fetch courses');
            console.log(error);
          }
        }
        setCoursesAndPubKeys(
          fetchedCourses as { course: Course; pubkey: String }[]
        );
        console.log(fetchedCourses);
      };

      getCourses();
    }
  }, [program, instructorPubKey, instructor]);

  return (
    <div className="bg-bg-color">
      <NavBar></NavBar>
      <main className={styles.main}>
        <div className="m-auto w-5/6">
          <div className="flex justify-between m-auto bg-fg-color h-40 rounded-xl">
            <div className="pl-8 flex flex-row justify-between items-center">
              <img
                className="rounded-full h-[100px] w-[100px]"
                src={instructor ? instructor.profilePicUrl : temporaryLoaderURL}
                alt="Profile Picture"
              />
              <h1 className="pl-6 h-9 text-2xl text-main-text tracking-widest">
                {instructor ? instructor.username : 'USERNAME'.toUpperCase()}
              </h1>
            </div>
          </div>
          <div className="pt-6 flex flex-row">
            <div className="flex flex-col h-96 pl-24 py-16 bg-fg-color rounded-xl">
              <h1 className="font-bold text-main-text tracking-widest leading-6 text-2xl">
                {`Instructor Summary`.toUpperCase()}
              </h1>
              <div className="pr-24  text-overview-secondary-text">
                <p className="pt-6 pr-6">
                  {
                    "Description. This will be a really long course description. It's gonna talk about how dope this course is and how you should take it. Seriously, though, you'll learn so much freaking material in this course, it won't even be funny, dude. Like oh my gawwwddd... You'll be a certified genius. Come take this course, please. Your SOL will sustain me to make other great courses such as this one to fuel both the adoption of web3 and my wallet for eons to come!!!"
                  }
                </p>
                <hr className="my-10 text-hr-color" />
              </div>
              {coursesAndPubKeys && (
                <h1 className="font-bold text-main-text tracking-widest leading-6 text-2xl mb-6">
                  {`Course Offerings`.toUpperCase()}
                </h1>
              )}

              {coursesAndPubKeys &&
                coursesAndPubKeys.map((tuple, index) => {
                  return (
                    <p
                      key={index}
                      className="cursor-pointer"
                      onClick={() => router.push(`/courses/${tuple.pubkey}`)}
                    >
                      {tuple.course.title}
                    </p>
                  );
                })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InstructorPage;
