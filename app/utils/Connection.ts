import * as anchor from '@project-serum/anchor';
import { ConfirmOptions } from '@solana/web3.js';

export const PROGRAM_ID = new anchor.web3.PublicKey(
  '927s7hwrsmMG62c7U5iRCxJyJrXf5sgrz94tUTLeDbCe'
);

export const OPTS = {
  preflightCommitment: 'processed',
} as ConfirmOptions;

const endpoint = 'https://api.devnet.solana.com';

export const connection = new anchor.web3.Connection(
  endpoint,
  OPTS.preflightCommitment
);
