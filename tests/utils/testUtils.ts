import { Program } from "@project-serum/anchor";
import { Soled } from "../../target/types/soled";
import * as Web3 from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import * as fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const program = anchor.workspace.Soled as Program<Soled>;
const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);

// Initializes or gets keypair
// Type specifies instructor, course, or otherwise
// ID allows differentiation, ie. instructors 1, 2, 3, etc.
export const getKeypair = async (
  connection: Web3.Connection,
  type: string,
  id: string
): Promise<Web3.Keypair> => {
  if (!process.env[`${type}${id}_PRIVATE_KEY`]) {
    console.log("Generating new keypair...");
    const signer = Web3.Keypair.generate();

    if (!fs.existsSync(".env")) {
      console.log("Creating .env file");
      fs.writeFileSync(
        ".env",
        `${type}${id}_PRIVATE_KEY=[${signer.secretKey.toString()}]`
      );
    } else {
      fs.appendFileSync(
        ".env",
        `\n${type}${id}_PRIVATE_KEY=[${signer.secretKey.toString()}]`
      );
    }

    await airdropSolIfNeeded(signer, connection);
    console.log("FINISHED AIRDROPPING");

    return signer;
  }

  const secret = JSON.parse(
    process.env[`${type}${id}_PRIVATE_KEY`] ?? ""
  ) as number[];
  const secretKey = Uint8Array.from(secret);
  const keypairFromSecret = Web3.Keypair.fromSecretKey(secretKey);

  await airdropSolIfNeeded(keypairFromSecret, connection);
  console.log("FINISHED AIRDROPPING");

  return keypairFromSecret;
};

const airdropSolIfNeeded = async (
  signer: Web3.Keypair,
  connection: Web3.Connection
) => {
  const balance = await connection.getBalance(signer.publicKey);
  console.log("Current balance is", balance / Web3.LAMPORTS_PER_SOL, "SOL");

  // 1 SOL should be enough for almost anything you wanna do
  if (balance / Web3.LAMPORTS_PER_SOL < 1) {
    console.log("Airdropping 1 SOL");
    const airdropSignature = await connection.requestAirdrop(
      signer.publicKey,
      Web3.LAMPORTS_PER_SOL
    );
    console.log("GOT AIRDROP SIGNATURE");

    const latestBlockhash = await connection.getLatestBlockhash();
    console.log("GOT LATEST BLOCKHASH");

    await connection.confirmTransaction({
      blockhash: latestBlockhash.blockhash,
      lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
      signature: airdropSignature,
    });

    const newBalance = await connection.getBalance(signer.publicKey);
    console.log("New balance is", newBalance / Web3.LAMPORTS_PER_SOL, "SOL");
  }
};

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

  let instructorAccount;
  try {
    instructorAccount = await program.account.instructor.fetch(
      instructorPubKey
    );
  } catch {
    if (!instructorAccount) {
      await program.methods
        .createInstructor(username, profilePicUrl, backgroundPicUrl)
        .accounts({
          instructor: instructorPubKey,
          authority: keypair.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([keypair])
        .rpc();

      try {
        instructorAccount = await program.account.instructor.fetch(
          instructorPubKey
        );
      } catch (error) {
        console.log(error);
      }
    }
  }

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
    .signers([keypair])
    .rpc();

  return instructorPubKey;
};
