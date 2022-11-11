import * as assert from "assert";
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Soled } from "../target/types/soled";
import * as utils from "./utils/testUtils";

describe("course", async () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

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

  const courseNumber = "1";
  const courseSeeds = [
    instructorPubKey.toBuffer(),
    Buffer.from("course"),
    Buffer.from(courseNumber),
  ];

  const [coursePubKey] = await anchor.web3.PublicKey.findProgramAddress(
    courseSeeds,
    program.programId
  );

  describe("creation", () => {
    afterEach(async () => {
      console.log("DELETING COURSE");
      // Delete Course
      await program.methods
        .deleteCourse()
        .accounts({
          course: coursePubKey,
          instructor: instructorPubKey,
          authority: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();

      // Fetch Course and check that it no longer exists
      try {
        const deletedCourse = await program.account.course.fetch(coursePubKey);
        console.log(deletedCourse);
      } catch (error) {
        console.log("COURSE:", error);
        const errorMsg = "Error: Account does not exist";

        // Check that output is the same as above message
        assert.equal(
          error.toString().substring(0, error.toString().lastIndexOf(" ")),
          errorMsg
        );
      }

      // Delete Instructor
      console.log("DELETING INSTRUCTOR");
      // await utils.deleteInstructor((provider.wallet as anchor.Wallet).payer);
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
        console.log("INSTRUCTOR", error);
        const errorMsg = "Error: Account does not exist";

        // Check that output is the same as above message
        assert.equal(
          error.toString().substring(0, error.toString().lastIndexOf(" ")),
          errorMsg
        );
      }
    });

    it("can create a Course account", async () => {
      // Create Instructor
      await program.methods
        .createInstructor("username", "profile pic url", "background pic url")
        .accounts({
          instructor: instructorPubKey,
          authority: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();

      const instructorAccount = await program.account.instructor.fetch(
        instructorPubKey
      );

      console.log("INSTRUCTOR ACCOUNT FOR COURSE", instructorAccount);

      assert.equal(instructorAccount.username, "username");
      assert.equal(instructorAccount.profilePicUrl, "profile pic url");
      assert.equal(instructorAccount.backgroundPicUrl, "background pic url");

      // Create Course
      await program.methods
        .createCourse(
          "1st course title",
          "Promising",
          1,
          32,
          "https://pngimg.com/uploads/cat/small/cat_PNG50550.png",
          courseNumber
        )
        .accounts({
          course: coursePubKey,
          instructor: instructorPubKey,
          authority: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();

      const courseAccount = await program.account.course.fetch(coursePubKey);
      console.log("COURSE ACCOUNT", courseAccount);

      assert.equal(courseAccount.title, "1st course title");
      assert.equal(courseAccount.rating, "Promising");
      assert.equal(courseAccount.price, 1);
      assert.equal(courseAccount.numLessons, 32);
      assert.equal(
        courseAccount.thumbnailUrl,
        "https://pngimg.com/uploads/cat/small/cat_PNG50550.png"
      );
    });

    /*
    it("deletes test course accounts", async () => {
      const courses = await program.account.course.all();
      // console.log("==============================================");
      // console.log(courses);

      courses.forEach(async (lesson) => {
        if (lesson.account.title === "1st course title") {
          await program.methods
            .deleteCourse()
            .accounts({
              course: lesson.publicKey,
              authority: provider.wallet.publicKey, // same as ...provider.wallet.publicKey
              systemProgram: anchor.web3.SystemProgram.programId,
            })
            .rpc();
        }
      });

      const coursesRemaining = await program.account.course.all();
      coursesRemaining.forEach(async (lesson) => {
        assert.notEqual(lesson.account.title, "1st course title");
      });
    });
    */
  });
});
