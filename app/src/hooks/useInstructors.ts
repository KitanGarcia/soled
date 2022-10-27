import { createContext, useContext } from 'react';
import { Instructor } from '../../types/Instructor';

export const InstructorsContext = createContext<Array<Instructor> | undefined>(
  undefined
);

export const useInstructors = () => {
  let context = useContext(InstructorsContext);
  if (context === undefined) {
    throw Error('Context is undefined');
  }
  return context;
};
