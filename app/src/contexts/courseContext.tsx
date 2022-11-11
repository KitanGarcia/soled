import * as anchor from '@project-serum/anchor';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import * as React from 'react';
import { Course } from '../../types/Course';
import { connection, OPTS, PROGRAM_ID } from '../../utils/Connection';
import IDL from '../../../target/idl/soled.json';
import { useCallback, useEffect, useState } from 'react';
import { CoursesContext } from '../hooks/useCourses';

type CoursesProviderProps = { children: React.ReactNode };

export const CoursesProvider = ({ children }: CoursesProviderProps) => {
  const [courses, setCourses] = useState<Array<Course>>([]);

  const wallet = useAnchorWallet();

  const program = React.useMemo(() => {
    if (wallet) {
      const provider = new anchor.AnchorProvider(connection, wallet, OPTS);

      return new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);
    }
    return null;
  }, [wallet]);

  const fetchInstructors = useCallback(async () => {
    if (!program) {
      return;
    }

    const allCourses = await program.account.course.all().then((courses) =>
      courses.map((course) => {
        course.account.publicKey = course.publicKey;
        return course.account;
      })
    );
    setCourses(allCourses as Course[]);
  }, [setCourses, program]);

  useEffect(() => {
    fetchInstructors();
  }, [fetchInstructors]);

  return (
    <CoursesContext.Provider value={courses as Course[]}>
      {children}
    </CoursesContext.Provider>
  );
};
