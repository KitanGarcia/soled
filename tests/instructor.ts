import * as assert from "assert";
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Soled } from "../target/types/soled";
import { connection } from "../app/utils/Connection";
import * as Web3 from "@solana/web3.js";

describe("instructor", async () => {
  // Configure the client to use the local cluster.

  const program = anchor.workspace.Soled as Program<Soled>;
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const instructorSeeds = [
    Buffer.from("instructor"),
    provider.wallet.publicKey.toBuffer(),
  ];
  const [instructorPubKey] = await anchor.web3.PublicKey.findProgramAddress(
    instructorSeeds,
    program.programId
  );

  describe("creation", () => {
    afterEach("deletes the instructor created", async () => {
      // Delete Instructor
      await program.methods
        .deleteInstructor()
        .accounts({
          instructor: instructorPubKey,
          authority: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();

      // Fetch Instructor and check that it no longer exists
      try {
        const deletedInstructor = await program.account.instructor.fetch(
          instructorPubKey
        );
        console.log(deletedInstructor);
      } catch (error) {
        const errorMsg = "Error: Account does not exist";

        // Check that output is the same as above message
        assert.equal(
          error.toString().substring(0, error.toString().lastIndexOf(" ")),
          errorMsg
        );
      }
    });

    it("creates an instructor account", async () => {
      const [instructorPubKey, _] =
        await anchor.web3.PublicKey.findProgramAddress(
          instructorSeeds,
          program.programId
        );

      const latestBlockhash = await connection.getLatestBlockhash("processed");
      const txn = new anchor.web3.Transaction({
        feePayer: instructorPubKey, //instructor.publicKey,
        ...latestBlockhash,
      });

      const ixn = await program.methods
        .createInstructor("username", "profile pic url", "background pic url")
        .accounts({
          instructor: instructorPubKey,
          authority: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .instruction();

      txn.add(ixn);
      await Web3.sendAndConfirmTransaction(connection, txn, []);

      const instructorAccount = await program.account.instructor.fetch(
        instructorPubKey
      );

      console.log("INSTRUCTOR ACCOUNT", instructorAccount);

      assert.equal(instructorAccount.username, "username");
      assert.equal(instructorAccount.profilePicUrl, "profile pic url");
      assert.equal(instructorAccount.backgroundPicUrl, "background pic url");
    });

    /*
    it("deletes test instructor accounts", async () => {
      const instructors = await program.account.instructor.all();
      // console.log("==============================================");
      // console.log(instructors);

      instructors.forEach(async (teacher) => {
        if (teacher.account.username === "username") {
          await program.methods
            .deleteInstructor()
            .accounts({
              instructor: teacher.publicKey,
              authority: provider.wallet.publicKey, // same as ...provider.wallet.publicKey
              systemProgram: anchor.web3.SystemProgram.programId,
            })
            .rpc();
        }
      });

      const instructorsRemaining = await program.account.instructor.all();
      instructorsRemaining.forEach(async (teacher) => {
        assert.notEqual(teacher.account.username, "username");
      });
    });
    */
  });
});
