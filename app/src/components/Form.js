import { useRef, useMemo, useEffect } from 'react';
import * as anchor from '@project-serum/anchor';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import IDL from '../../../target/idl/soled.json';
import { connection, OPTS, PROGRAM_ID } from '../../utils/Connection';

export default function Form({ setShowModal }) {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const thumbnailUrlRef = useRef();

  const connectedWallet = useAnchorWallet();
  const program = useMemo(() => {
    if (connectedWallet) {
      const provider = new anchor.AnchorProvider(
        connection,
        connectedWallet,
        OPTS
      );
      return new anchor.Program(IDL, PROGRAM_ID, provider);
    }
    return null;
  }, [connectedWallet]);

  useEffect(() => {
    titleRef?.current?.focus();
  }, [titleRef]);

  const createNewCourse = async () => {
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const thumbnailUrl = thumbnailUrlRef.current.value;

    console.log(connectedWallet);
    console.log(title);
    console.log(description);
    console.log(thumbnailUrl);

    if (connectedWallet && program && title && description && thumbnailUrl) {
      // Create account on chain
      /*
      const creatorSeeds = [
        connectedWallet.publicKey.toBuffer(),
        Buffer.from('creator'),
      ];

      const [creatorPubKey] = await anchor.web3.PublicKey.findProgramAddress(
        creatorSeeds,
        program.programId
      );
      */

      const course = anchor.web3.Keypair.generate();

      setShowModal(false);

      // Create Course account
      await program.rpc.createCourse(title, description, thumbnailUrl, {
        accounts: {
          course: course.publicKey,
          authority: connectedWallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [course],
      });

      try {
        const courseAccount = await program.account.course.fetch(
          course.publicKey
        );
        console.log('COURSE ACCOUNT', courseAccount);
      } catch {
        console.log('COURSE UNABLE TO BE CREATED');
      }
    }
  };

  return (
    <div class="absolute w-2/4 h-2/4 top-0 bottom-0 rounded-xl left-0 right-0 m-auto shadow-xl bg-white">
      <div class="bg-white px-4 pt-5 pb-4 h-3/4 rounded-xl">
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3
            class="text-lg font-medium leading-6 text-gray-900"
            id="modal-title"
          >
            Create Course
          </h3>
          <div class="mt-2 flex flex-col items-center">
            <div className="mt-6 w-3/5">
              <label className="relative left-8 top-5 bg-white">Title</label>
              <input
                className="border-2 w-full rounded-full mt-2 pl-2 h-8"
                placeholder="My Course"
                type="text"
                ref={titleRef}
              ></input>
            </div>
            <div className="mt-6 w-3/5">
              <label className="relative left-8 top-5 bg-white">
                Description
              </label>
              <input
                className="border-2 w-full rounded-full mt-2 pl-2 h-8"
                placeholder="Course Description"
                type="text"
                ref={descriptionRef}
              ></input>
            </div>
            <div className="mt-6 w-3/5">
              <label className="relative left-8 top-5 bg-white">
                Thumbnail URL
              </label>
              <input
                className="border-2 w-full rounded-full mt-2 pl-2 h-8"
                placeholder="https://via.placeholder.com/600x400"
                type="text"
                ref={thumbnailUrlRef}
              ></input>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          onClick={() => createNewCourse()}
          type="button"
          class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Add Course
        </button>
      </div>
    </div>
  );
}
