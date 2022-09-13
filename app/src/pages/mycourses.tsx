import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import styles from '../styles/Home.module.css';

import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';
import CourseGrid from '../components/CourseGrid';

const MyCourses: NextPage = () => {
    return (
        <div className={styles.container}>
            <NavBar></NavBar>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    All of my courses
                </h1>

                Option to view and add courses here
            </main>

            <Footer />
        </div>
    );
};

export default MyCourses;
