import type { NextPage } from 'next';
import React, { useState } from 'react';

import styles from '../styles/Home.module.css';
import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';
import Form from '../components/Form';

const MyCourses: NextPage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="bg-bg-color">
      <NavBar></NavBar>
      <main className={styles.main}>
        <h1 className={styles.title}>All of my courses</h1>
        Option to view and add courses here
        <button onClick={() => handleClick()}>
          <h1 className={styles.button}>Add Course</h1>
        </button>
      </main>
      {showModal && <Form setShowModal={setShowModal} />}

      <Footer />
    </div>
  );
};

export default MyCourses;
