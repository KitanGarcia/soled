import * as assert from "assert";
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Soled } from "../target/types/soled";
import { connection } from "../app/utils/Connection";

describe("instructor", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Soled as Program<Soled>;
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  describe("creation", () => {
    const instructor = anchor.web3.Keypair.generate();

    afterEach("deletes the instructor created", async () => {
      // Delete Instructor

      const latestBlockhash = await connection.getLatestBlockhash("processed");
      const deleteTxn = new anchor.web3.Transaction({
        feePayer: instructor.publicKey,
        ...latestBlockhash,
      });

      const inst = await program.methods
        .deleteInstructor()
        .accounts({
          instructor: instructor.publicKey,
          authority: provider.wallet.publicKey, // same as ...provider.wallet.publicKey
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([instructor])
        .instruction();

      deleteTxn.add(inst);

      // Sign transaction, broadcast, and confirm
      const signature = await anchor.web3.sendAndConfirmTransaction(
        connection,
        deleteTxn,
        [instructor]
      );
      console.log("SIGNATURE", signature);

      /*
      await program.methods
        .deleteInstructor()
        .accounts({
          instructor: instructor.publicKey,
          authority: provider.wallet.publicKey, // same as ...provider.wallet.publicKey
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();
        */

      // Fetch Instructor and check that it no longer exists
      try {
        const deletedInstructor = await program.account.instructor.fetch(
          instructor.publicKey
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
      const signers = [instructor];

      await program.methods
        .createInstructor("username", "profile pic url", "background pic url")
        .accounts({
          instructor: instructor.publicKey,
          authority: provider.wallet.publicKey, // same as ...provider.wallet.publicKey
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers(signers)
        .rpc();

      /*
      const latestBlockhash = await connection.getLatestBlockhash("processed");
      const createInstructorTxn = new anchor.web3.Transaction({
        feePayer: instructor.publicKey,
        ...latestBlockhash,
      });


      createInstructorTxn.add(
        program.methods
          .createInstructor("username", "profile pic url", "background pic url")
          .accounts({
          instructor: instructor.publicKey,
          authority: provider.wallet.publicKey, // same as ...provider.wallet.publicKey
          systemProgram: anchor.web3.SystemProgram.programId,
        }).signers(signers)
      );
      */

      //await program.provider.send(txn, signers);
      //await connection.sendTransaction(txn, [course]);
      //await program.provider.sendAndConfirm(txn);
      const instructorAccount = await program.account.instructor.fetch(
        instructor.publicKey
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
