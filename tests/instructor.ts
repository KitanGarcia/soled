import * as assert from "assert";
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Soled } from "../target/types/soled";
import { connection } from "../app/utils/Connection";
import * as web3 from "@solana/web3.js";

describe("instructor", () => {
  // Configure the client to use the local cluster.

  const program = anchor.workspace.Soled as Program<Soled>;
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  //anchor.setProvider(anchor.AnchorProvider.env());

  console.log("PROVIDERRRRRRRRRR: ", provider.wallet.publicKey.toString());
  console.log(
    "PAYER: ",
    (provider.wallet as anchor.Wallet).payer.publicKey.toString()
  );
  const instructorSeeds = [
    Buffer.from("instructor"),
    provider.wallet.publicKey.toBuffer(),
  ];

  describe("creation", () => {
    afterEach("deletes the instructor created", async () => {
      const [instructorPubKey] = await anchor.web3.PublicKey.findProgramAddress(
        instructorSeeds,
        program.programId
      );

      // Delete Instructor
      await program.methods
        .deleteInstructor()
        .accounts({
          instructor: instructorPubKey,
          authority: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();

      /*
      // BELOW IS HOW TO CREATE AN IXN, ADD TO TXN, SIGN IN DIFFERENT WAYS, AND SEND
      const latestBlockhash = await connection.getLatestBlockhash("processed");
      const deleteTxn = new anchor.web3.Transaction({
        feePayer: instructor.publicKey,
        ...latestBlockhash,
      });

      const instruction = await program.methods
        .deleteInstructor()
        .accounts({
          instructor: instructor.publicKey,
          authority: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .instruction();

      deleteTxn.add(instruction);


      //deleteTxn.sign((provider.wallet as anchor.Wallet).payer);
      const test1 = await provider.wallet.signTransaction(deleteTxn);
      console.log("TEST1", test1);

      console.log("==========================");
      console.log((provider.wallet as anchor.Wallet).payer);
      console.log("==========================");

      const test = await provider.connection.sendRawTransaction(
        deleteTxn.serialize(),
        {
          skipPreflight: true,
          preflightCommitment: "confirmed",
        }
      );
      console.log(test);

      // Sign transaction, broadcast, and confirm
      const signature = await anchor.web3.sendAndConfirmTransaction(
        connection,
        deleteTxn,
        [(provider.wallet as anchor.Wallet).payer]
      );
      console.log("SIGNATURE", signature);
      */

      /*
      // ANOTHER ALTERNATIVE
      const tx = new Transaction();
      tx.add(myInstruction);
      provider.wallet.signTransaction(tx);
      await provider.connection.sendRawTransaction(
          tx.serialize(),
          {
              skipPreflight: true,
              preflightCommitment: "confirmed",
          },
      )
      */

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
      console.log("INSTRUCTOR PUBKEY: ", instructorPubKey.toString());
      const accountInfo = await connection.getAccountInfo(instructorPubKey);
      const isExist = accountInfo !== null;
      console.log(accountInfo);
      console.log(isExist);
      console.log("--------------------");

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

      console.log(
        txn
          .serialize({ requireAllSignatures: false, verifySignatures: false })
          .toString("base64")
      );

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
