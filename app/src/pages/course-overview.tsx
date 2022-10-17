import type { NextPage } from 'next';
import { HeartIcon } from '@heroicons/react/24/solid';
import React from 'react';

import styles from '../styles/Home.module.css';
import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';

const MyCourses: NextPage = () => {
  return (
    <div className="bg-bg-color">
      <NavBar></NavBar>
      <main className={styles.main}>
        <div className="m-auto w-5/6">
          <div className="flex justify-between m-auto bg-fg-color h-40 rounded-xl">
            <div className="pl-8 flex flex-row justify-between items-center">
              <img
                className="rounded-full h-[100px] w-[100px]"
                src="https://imgs.search.brave.com/1jotBYRliFn8D84WwWMIY7RMyracWBEeu9yv5olbKHo/rs:fit:498:498:1/g:ce/aHR0cHM6Ly9jcnlw/dG9yYW5rLWltYWdl/cy5zMy5ldS1jZW50/cmFsLTEuYW1hem9u/YXdzLmNvbS9jb2lu/cy9zb2xhbmExNjA2/OTc5MDkzMDU2LnBu/Zw"
                alt="Course Image"
              />
              <h1 className="pl-6 h-9 text-2xl text-main-text tracking-widest">
                {'SOLANA TESTNET'.toUpperCase()}
              </h1>
            </div>

            <div className="my-4 mr-4 flex flex-col justify-between items-center bg-[#A0B3F9] text-main-text rounded-xl">
              <h1 className="p-4 font-bold text-2xl leading-10">
                {' '}
                8/10 Rating
              </h1>
              <p className="p-4 text-base leading-10">
                Subtitle text that I do not understand
              </p>
            </div>
          </div>
          <div className="pt-6 flex flex-row">
            <div className="flex basis-1/4 h-fit bg-fg-color rounded-xl">
              <ul className="w-full">
                <li className="h-14 flex items-center cursor-pointer hover:bg-hover-bg active:border-r-4 active:border-r-hover active:text-active-text pl-6 leading-5 tracking-widest text-main-text mt-4">
                  LINK
                </li>
                <li className="h-14 flex items-center cursor-pointer hover:bg-hover-bg active:border-r-4 active:border-r-hover active:text-active-text pl-6 leading-5 tracking-widest text-main-text">
                  LINK
                </li>
                <li className="h-14 flex items-center cursor-pointer hover:bg-hover-bg active:border-r-4 active:border-r-hover active:text-active-text pl-6 leading-5 tracking-widest text-main-text">
                  LINK
                </li>
                <li className="h-14 flex items-center cursor-pointer hover:bg-hover-bg active:border-r-4 active:border-r-hover active:text-active-text pl-6 leading-5 tracking-widest text-main-text">
                  LINK
                </li>
                <li className="h-14 flex items-center cursor-pointer hover:bg-hover-bg active:border-r-4 active:border-r-hover active:text-active-text pl-6 leading-5 tracking-widest text-main-text mb-4">
                  LINK
                </li>
              </ul>
            </div>
            <div className="flex flex-col basis-3/4 h-96 pl-24 py-16 bg-fg-color rounded-xl ml-6">
              <div className="flex justify-between items-center h-14 w-full">
                <h1 className="font-bold text-main-text tracking-widest leading-6 text-2xl">
                  {`SOLANA TEST`.toUpperCase()}
                </h1>
                <div className="w-1/4 flex justify-center">
                  <button className="btn h-[45px] w-[45px] rounded-full border-2 border-card-border-color-start bg-fg-color hover:bg-gradient-to-br from-solana-start to-solana-end hover:border-2 hover:border-card-border-color-start">
                    <HeartIcon className="text-main-text offset-position" />
                  </button>
                  <button className="mx-4 btn h-[45px] w-[45px] rounded-full border-2 border-card-border-color-start bg-fg-color hover:bg-gradient-to-br from-solana-start to-solana-end hover:border-2 hover:border-card-border-color-start">
                    <HeartIcon className="text-main-text offset-position" />
                  </button>
                  <button className="btn h-[45px] w-[45px] rounded-full border-2 border-card-border-color-start bg-fg-color hover:bg-gradient-to-br from-solana-start to-solana-end hover:border-2 hover:border-card-border-color-start">
                    <HeartIcon className="text-main-text offset-position" />
                  </button>
                </div>
              </div>
              <div className="pr-24  text-overview-secondary-text">
                <p className="py-6">Status: status</p>
                <div className="flex justify-between w-1/2">
                  <p>Placeholder1: text</p>
                  <p>Placeholder2: text</p>
                </div>
                <p className="pt-6 pr-6">
                  Description. This will be a really long course description.
                  It's gonna talk about how dope this course is and how you
                  should take it. Seriously, though, you'll learn so much
                  freaking material in this course, it won't even be funny,
                  dude. Like oh my gawwwddd... You'll be a certified genius.
                  Come take this course, please. Your SOL will sustain me to
                  make other great courses such as this one to fuel both the
                  adoption of web3 and my wallet for eons to come!!!
                </p>
                <hr className="my-10 text-hr-color" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyCourses;
