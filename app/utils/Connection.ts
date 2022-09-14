import * as anchor from '@project-serum/anchor';
import { ConfirmOptions } from '@solana/web3.js';

export const PROGRAM_ID = new anchor.web3.PublicKey(
  'Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS'
);

export const OPTS = {
  preflightCommitment: 'processed',
} as ConfirmOptions;

const endpoint = 'https://api.devnet.solana.com';

export const connection = new anchor.web3.Connection(
  endpoint,
  OPTS.preflightCommitment
);
