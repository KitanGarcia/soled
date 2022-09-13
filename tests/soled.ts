import * as assert from "assert";
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Soled } from "../target/types/soled";

describe("soled", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Soled as Program<Soled>;
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });

  describe("creation", () => {
    const course = anchor.web3.Keypair.generate();

    afterEach(async () => {
      // Delete Course
      await program.rpc.deleteCourse({
        accounts: {
          course: course.publicKey,
          authority: provider.wallet.publicKey, // same as ...provider.wallet.publicKey
          systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [],
      });

      // Fetch Creator and check that it no longer exists
      try {
        const deletedCourse = await program.account.course.fetch(
          course.publicKey
        );
        console.log(deletedCourse);
      } catch (error) {
        const errorMsg = "Error: Account does not exist";
        // Check that output is the same as above message
        assert.equal(
          error.toString().substring(0, error.toString().lastIndexOf(" ")),
          errorMsg
        );
      }
    });

    it("can create a Course account", async () => {
      const signers = [course];

      await program.rpc.createCourse(
        "1st course title",
        "1st course description",
        "thumbnail url",
        {
          accounts: {
            course: course.publicKey,
            //authority: program.provider.wallet.publicKey,
            authority: provider.wallet.publicKey, // same as ...provider.wallet.publicKey
            systemProgram: anchor.web3.SystemProgram.programId,
          },
          signers: signers,
        }
      );

      //await program.provider.send(txn, signers);
      //await connection.sendTransaction(txn, [course]);
      //await program.provider.sendAndConfirm(txn);
      const courseAccount = await program.account.course.fetch(
        course.publicKey
      );
      console.log("ACCOUNT", courseAccount);

      assert.equal(courseAccount.title, "1st course title");
      assert.equal(courseAccount.description, "1st course description");
      assert.equal(courseAccount.thumbnailUrl, "thumbnail url");
    });
  });
});
