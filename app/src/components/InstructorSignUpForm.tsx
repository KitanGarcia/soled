import { useRef, useMemo, useEffect, Dispatch, SetStateAction } from 'react';
import * as anchor from '@project-serum/anchor';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import IDL from '../../../target/idl/soled.json';
import { connection, OPTS, PROGRAM_ID } from '../../utils/Connection';

interface formProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function InstructorSignUpForm({ setShowModal }: formProps) {
  const usernameRef = useRef<HTMLInputElement>(null);
  const profilePicUrlRef = useRef<HTMLInputElement>(null);
  const backgroundPicUrlRef = useRef<HTMLInputElement>(null);

  const connectedWallet = useAnchorWallet();
  const program = useMemo(() => {
    if (connectedWallet) {
      const provider = new anchor.AnchorProvider(
        connection,
        connectedWallet,
        OPTS
      );
      return new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);
    }
    return null;
  }, [connectedWallet]);

  useEffect(() => {
    if (usernameRef && usernameRef.current) {
      usernameRef.current.focus();
    }
  }, [usernameRef]);

  const createInstructor = async () => {
    const username = usernameRef!.current!.value;
    const profilePicUrl = profilePicUrlRef!.current!.value;
    const backgroundPicUrl = backgroundPicUrlRef!.current!.value;

    setShowModal(false);

    if (
      connectedWallet &&
      program &&
      username &&
      profilePicUrl &&
      backgroundPicUrl
    ) {
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

      const instructor = anchor.web3.Keypair.generate();

      // Create Instructor account
      try {
        await program.rpc.createInstructor(
          username,
          profilePicUrl,
          backgroundPicUrl,
          {
            accounts: {
              instructor: instructor.publicKey,
              authority: connectedWallet.publicKey,
              systemProgram: anchor.web3.SystemProgram.programId,
            },
            signers: [instructor],
          }
        );

        try {
          const instructorAccount = await program.account.instructor.fetch(
            instructor.publicKey
          );
          console.log(instructorAccount);
        } catch {
          console.error('Course unable to be created.');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const focusInput = (
    e: React.FocusEvent<HTMLInputElement, Element>,
    field: string
  ) => {
    const label = document.querySelector(`.${field}-label`);
    label?.classList.add('text-main-text');
    e.target.classList.add('border-main-text');
    e.target.classList.add('text-main-text');
  };

  const blurInput = (
    e: React.FocusEvent<HTMLInputElement, Element>,
    field: string
  ) => {
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
              Sign Up
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
              <label className="username-label relative left-8 top-5 bg-fg-color">
                Username
              </label>
              <input
                className="border-2 placeholder-secondary-text placeholder-opacity-50 outline-0 bg-fg-color w-full rounded-full mt-2 pl-2 h-8"
                placeholder="user12345"
                type="text"
                ref={usernameRef}
                onFocus={(e) => focusInput(e, 'username')}
                onBlur={(e) => blurInput(e, 'username')}
              ></input>
            </div>
            <div className="mt-6 w-3/5">
              <label className="profilePic-label relative bg-fg-color left-8 top-5 bg-fg-color">
                Profile Picture URL
              </label>
              <input
                className="border-2 placeholder-secondary-text placeholder-opacity-50 outline-0 bg-fg-color w-full rounded-full mt-2 pl-2 h-8"
                placeholder="https://via.placeholder.com/30x30"
                type="text"
                ref={profilePicUrlRef}
                onFocus={(e) => focusInput(e, 'profilePic')}
                onBlur={(e) => blurInput(e, 'profilePic')}
              ></input>
            </div>
            <div className="mt-6 w-3/5">
              <label className="relative backgroundPic-label bg-fg-color left-8 top-5 bg-fg-color">
                Background Picture URL
              </label>
              <input
                className="border-2 outline-0 bg-fg-color w-full rounded-full mt-2 pl-2 h-8 placeholder-secondary-text placeholder-opacity-50"
                placeholder="https://via.placeholder.com/800x200"
                type="text"
                ref={backgroundPicUrlRef}
                onFocus={(e) => focusInput(e, 'backgroundPic')}
                onBlur={(e) => blurInput(e, 'backgroundPic')}
              ></input>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 pt-10 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          onClick={() => createInstructor()}
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-card-border-color-start bg-like-btn px-4 py-2 font-medium shadow-sm hover:bg-gradient-to-br hover:from-solana-start hover:to-solana-end hover:border-none hover:text-main-text sm:ml-3 sm:w-auto sm:text-sm"
        >
          Register
        </button>
      </div>
    </div>
  );
}
