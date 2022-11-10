import { Program } from "@project-serum/anchor";
import { Soled } from "../../target/types/soled";
import * as Web3 from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";

const program = anchor.workspace.Soled as Program<Soled>;
const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);

// Given instructor public key, checks if it exists
export const instructorExists = async (publicKey: Web3.PublicKey) => {
  const instructor = await program.account.instructor.fetch(publicKey);
  console.log("INSTRUCTOR EXISTS?", instructor ? true : false);
  return instructor ? true : false;
};

// Given public key (ie. from provider or generated keypair), creates an instructor
export const createInstructor = async (
  keypair: Web3.Keypair,
  username: string = "username",
  profilePicUrl: string = "profile pic url",
  backgroundPicUrl: string = "background pic url"
) => {
  console.log("Creating Instructor...");
  const instructorSeeds = [
    Buffer.from("instructor"),
    keypair.publicKey.toBuffer(),
  ];
  const [instructorPubKey, _] = await anchor.web3.PublicKey.findProgramAddress(
    instructorSeeds,
    program.programId
  );

  await program.methods
    .createInstructor(username, profilePicUrl, backgroundPicUrl)
    .accounts({
      instructor: instructorPubKey,
      authority: keypair.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .rpc();

  const instructorAccount = await program.account.instructor.fetch(
    instructorPubKey
  );
  console.log("INSTRUCTOR ACCOUNT", instructorAccount);

  return instructorAccount;
};

// Given public key (ie. from provider or generated keypair), deletes an instructor
export const deleteInstructor = async (keypair: Web3.Keypair) => {
  console.log(`Deleting Instructor: ${keypair.publicKey.toString()}...`);
  const instructorSeeds = [
    Buffer.from("instructor"),
    keypair.publicKey.toBuffer(),
  ];
  const [instructorPubKey] = await anchor.web3.PublicKey.findProgramAddress(
    instructorSeeds,
    program.programId
  );

  await program.methods
    .deleteInstructor()
    .accounts({
      instructor: instructorPubKey,
      authority: keypair.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .rpc();

  return instructorPubKey;
};
