import * as anchor from '@project-serum/anchor';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import * as React from 'react';
import { Instructor } from '../../types/Instructor';
import { connection, OPTS, PROGRAM_ID } from '../../utils/Connection';
import IDL from '../../../target/idl/soled.json';
import { useCallback, useEffect, useState } from 'react';
import { InstructorsContext } from '../hooks/useInstructors';

type InstructorsProviderProps = { children: React.ReactNode };

export const InstructorsProvider = ({ children }: InstructorsProviderProps) => {
  const [instructors, setInstructors] = useState<Array<Instructor>>([]);

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

    const allInstructors = await program.account.instructor
      .all()
      .then((instructors) =>
        instructors.map((instructor) => instructor.account)
      );
    setInstructors(allInstructors as Instructor[]);
  }, [setInstructors, program]);

  useEffect(() => {
    fetchInstructors();
  }, [fetchInstructors]);

  return (
    <InstructorsContext.Provider value={instructors as Instructor[]}>
      {children}
    </InstructorsContext.Provider>
  );
};
