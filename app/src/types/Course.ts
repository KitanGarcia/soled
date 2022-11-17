import { PublicKey } from '@solana/web3.js';

export type Course = {
  authority: PublicKey;
  publicKey: PublicKey;
  title: string;
  thumbnailUrl: string;
  rating: number;
  price: number;
  numLessons: number;
  bump: number;
};
