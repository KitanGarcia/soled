import type { NextPage } from 'next';
import React, { useState } from 'react';

import styles from '../styles/Home.module.css';
import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';
import InstructorSignUpForm from '../components/InstructorSignUpForm';

const InstructorSignUp: NextPage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <div className="bg-bg-color">
      <NavBar></NavBar>
      <main className={styles.main}>
        <h1 className={styles.title}>Become an Instructor</h1>
        Sign up to create courses
        <button
          onClick={() => handleClick()}
          className="inline-flex w-1/8 justify-center rounded-md border border-card-border-color-start bg-like-btn px-4 py-2 mt-4 font-medium shadow-sm hover:bg-gradient-to-br hover:from-solana-start hover:to-solana-end hover:border-none hover:text-main-text"
        >
          Register
        </button>
      </main>
      {showModal && <InstructorSignUpForm setShowModal={setShowModal} />}

      <Footer />
    </div>
  );
};

export default InstructorSignUp;
