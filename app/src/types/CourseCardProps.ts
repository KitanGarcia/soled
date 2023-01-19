import { PublicKey } from '@solana/web3.js';

export type CourseCardProps = {
  authority: PublicKey;
  publicKey: PublicKey;
  title: string;
  thumbnailUrl: string;
  rating: number;
  price: number;
  numLessons: number;
};
