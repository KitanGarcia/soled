import type { NextPage } from 'next';
import React, { useState } from 'react';

import styles from '../styles/Home.module.css';
import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';
import Minting from '../components/Minting/Minting';

const MintingPage: NextPage = () => {
  return (
    <div className="bg-bg-color">
      <NavBar></NavBar>
      <main className={styles.main}>
        <h1 className={styles.title}>Minting page</h1>
        <Minting />
      </main>

      <Footer />
    </div>
  );
};

export default MintingPage;
