import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import styles from '../styles/Home.module.css';

import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';

const Home: NextPage = () => {
  return (
    <div className="bg-bg-color text-main-text">
      <NavBar></NavBar>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
