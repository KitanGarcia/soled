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
      try {
        await program.rpc.createCourse(
          'title',
          'description',
          'https://via.placeholder.com/600x400',
          {
            accounts: {
              course: course.publicKey,
              authority: connectedWallet.publicKey,
              systemProgram: anchor.web3.SystemProgram.programId,
            },
            signers: [course],
          }
        );

        try {
          const courseAccount = await program.account.course.fetch(
            course.publicKey
          );
        } catch {
          console.error('Course unable to be created.');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const focusInput = (e, field) => {
    const label = document.querySelector(`.${field}-label`);
    label?.classList.add('text-main-text');
    e.target.classList.add('border-main-text');
    e.target.classList.add('text-main-text');
  };

  const blurInput = (e, field) => {
    const label = document.querySelector(`.${field}-label`);
    label?.classList.remove('text-main-text');
    e.target.classList.remove('border-main-text');
    e.target.classList.remove('text-main-text');
  };

  return (
    <div
      className="absolute form w-2/4 h-2/4 top-0 bottom-0 rounded-xl left-0 right-0 m-auto shadow-xl border border-card-border-color-start bg-fg-color"
      id="form"
    >
      <div className="bg-fg-color px-4 pt-5 pb-4 h-3/4 rounded-xl">
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <div className="flex justify-between">
            <h3
              className="text-lg mx-4 font-medium leading-6 text-gray-900"
              id="modal-title"
            >
              Create Course
            </h3>
            <h3
              className="mx-4 border-2 w-[30px] h-[30px] rounded-full text-center hover:cursor-pointer hover:bg-gradient-to-br hover:from-solana-start hover:to-solana-end hover:border-none hover:border-main-text hover:text-main-text"
              onClick={() => setShowModal(false)}
            >
              X
            </h3>
          </div>
          <div className="mt-2 flex flex-col items-center">
            <div className="mt-6 w-3/5">
              <label className="title-label relative left-8 top-5 bg-fg-color">
                Title
              </label>
              <input
                className="border-2 outline-0 bg-fg-color w-full rounded-full mt-2 pl-2 h-8"
                placeholder="My Course"
                type="text"
                ref={titleRef}
                onFocus={(e) => focusInput(e, 'title')}
                onBlur={(e) => blurInput(e, 'title')}
              ></input>
            </div>
            <div className="mt-6 w-3/5">
              <label className="description-label relative bg-fg-color left-8 top-5 bg-fg-color">
                Description
              </label>
              <input
                className="border-2 outline-0 bg-fg-color w-full rounded-full mt-2 pl-2 h-8"
                placeholder="Course Description"
                type="text"
                ref={descriptionRef}
                onFocus={(e) => focusInput(e, 'description')}
                onBlur={(e) => blurInput(e, 'description')}
              ></input>
            </div>
            <div className="mt-6 w-3/5">
              <label className="relative thumbnailUrl-label bg-fg-color left-8 top-5 bg-fg-color">
                Thumbnail URL
              </label>
              <input
                className="border-2 outline-0 bg-fg-color w-full rounded-full mt-2 pl-2 h-8"
                placeholder="https://via.placeholder.com/600x400"
                type="text"
                ref={thumbnailUrlRef}
                onFocus={(e) => focusInput(e, 'thumbnailUrl')}
                onBlur={(e) => blurInput(e, 'thumbnailUrl')}
              ></input>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 pt-10 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          onClick={() => createNewCourse()}
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-card-border-color-start bg-like-btn px-4 py-2 font-medium shadow-sm hover:bg-gradient-to-br hover:from-solana-start hover:to-solana-end hover:border-none hover:text-main-text sm:ml-3 sm:w-auto sm:text-sm"
        >
          Add Course
        </button>
      </div>
    </div>
  );
}
