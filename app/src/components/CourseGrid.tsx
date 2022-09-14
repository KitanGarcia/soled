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
      const provider = new AnchorProvider(connection, wallet, OPTS);
      return new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);
    }

    return null;
  }, [wallet]);

  const getCourses = useCallback(async () => {
    console.log("getCourses");
    if (wallet && program) {
      try {
        const allCourses = await program.account.course.all()

        console.log(allCourses);
  
        setCourses(allCourses)

        console.log(courses);
  
      } catch (error) {
        console.error(error);
      }
    }
  }, [wallet, program]);

  const addSol = async () => {
    if (!wallet) {
      console.error('wallet key not found');
      return;
    }

    const connection = new Connection(clusterApiUrl('devnet'));
    const signature = await connection.requestAirdrop(wallet.publicKey, LAMPORTS_PER_SOL);

    await connection.confirmTransaction(signature, 'confirmed');

    const lamports = await connection.getBalance(wallet.publicKey, 'confirmed');
    const balance = lamports / LAMPORTS_PER_SOL;

    console.log(`[requestAirdrop] success, balance is now ${balance} sol`);
  }

  useEffect(() => {
    if (
      wallet &&
      program
    ) {
      getCourses();
    }
  }, [wallet, program, getCourses]);

  return (
    <div className="place-content-center flex flex-wrap p-5 gap-4">
      <button onClick={addSol} className="cta-button submit-gif-button"> Add SOL</button>
      <button onClick={getCourses} className="cta-button submit-gif-button"> Get Courses</button>

      {courses.map((course: any, index: any) => {
        <div>
          <h1>{course.account.title}</h1>
          {/* <CourseCard title={course.account.title}></CourseCard> */}
        </div>
      })}
    </div>
  )
}
