import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Connection, clusterApiUrl, ConfirmOptions, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { Program, AnchorProvider } from '@project-serum/anchor';
import * as anchor from '@project-serum/anchor';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import CourseCard from './CourseCard';
import IDL from '../../../target/idl/soled.json';

const PROGRAM_ID = new anchor.web3.PublicKey("927s7hwrsmMG62c7U5iRCxJyJrXf5sgrz94tUTLeDbCe");

const OPTS = {
  preflightCommitment: "processed",
} as ConfirmOptions;

const endpoint = 'https://api.devnet.solana.com';
const connection = new anchor.web3.Connection(
  endpoint,
  OPTS.preflightCommitment
) 

export default function CourseGrid() {
  const wallet = useAnchorWallet();

  const [courses, setCourses] = useState([] as any);

  const program = useMemo(() => {
    if (wallet) {
      const provider = new AnchorProvider(connection, wallet!, OPTS);
      return new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);
    }
  }, [wallet]);

  const getCourses = useCallback(async () => {
    if (wallet && program) {
      try {
        const allCourses = await program.account.course.all()
  
        setCourses(allCourses)
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
      {wallet && courses && courses.map((course: any, index: number) => (
        <div key={index}>
          <CourseCard 
            title={course.account.title}
            rating={course.account.rating}
            price={course.account.price}
            lessons={course.account.lessons}
            thumbnailUrl={course.account.thumbnailUrl}
          />
        </div>
      ))}
    </div>
  )
}
