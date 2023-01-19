import { PublicKey } from '@solana/web3.js';

export type Instructor = {
  authority: PublicKey;
  username: string;
  profilePicUrl: string;
  backgroundPicUrl: string;
  numFollowers: number;
  numFollowing: number;
  numCourses: number;
  rating: number;
  bump: number;
};
