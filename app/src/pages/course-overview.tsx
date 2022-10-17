import type { NextPage } from 'next';
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
              <h1 className="pl-6 h-9 text-2xl tracking-widest">
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
          <div className="pt-6">
            <div className="flex justify-between w-3/12 bg-fg-color rounded-xl">
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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyCourses;
