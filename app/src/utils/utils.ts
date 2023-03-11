import { PublicKey } from '@solana/web3.js';

export const shortenAddress = (pubKey: PublicKey | string) => {
  if (pubKey instanceof PublicKey) {
    pubKey = pubKey.toString();
  }
  return pubKey.substring(0, 6) + '...' + pubKey.substring(pubKey.length - 4);
};
