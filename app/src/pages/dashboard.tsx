import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import styles from '../styles/Home.module.css';

import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';
import CourseGrid from '../components/CourseGrid';

const Dashboard: NextPage = () => {
  return (
    <div className="bg-bg-color text-main-text">
      <NavBar></NavBar>

      <main className={styles.main}>
        <h1 className={styles.title}>Courses</h1>

        <CourseGrid />
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
