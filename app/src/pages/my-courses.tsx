import type { NextPage } from 'next';
import React, { useState } from 'react';

import styles from '../styles/Home.module.css';
import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';
import CreateCourseForm from '../components/CreateCourseForm';

const MyCourses: NextPage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <div className="bg-bg-color">
      <NavBar></NavBar>
      <main
        className={`${styles.main} flex flex-col justify-center items-center`}
      >
        <h1 className={styles.title}>All of my courses</h1>
        Option to view and add courses here
        <button
          onClick={() => handleClick()}
          className="inline-flex w-1/8 justify-center rounded-md border border-card-border-color-start bg-like-btn px-4 py-2 mt-4 font-medium shadow-sm hover:bg-gradient-to-br hover:from-solana-start hover:to-solana-end hover:border-transparent hover:text-main-text"
        >
          Add Course
        </button>
        {showModal && <CreateCourseForm setShowModal={setShowModal} />}
      </main>

      <Footer />
    </div>
  );
};

export default MyCourses;
