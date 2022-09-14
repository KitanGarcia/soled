import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import styles from '../styles/Home.module.css';
import CourseCard from '../components/CourseCard';
import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';

import CourseGrid from '../components/CourseGrid';
import Form from '../components/Form'

const MyForms: NextPage = () => {
    return (
        <div className={styles.container}>
            <NavBar></NavBar>
            
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Fill a form
                </h1>
                <Form></Form>
            </main>
            
    
            <Footer />
        </div>
    );
};

export default MyForms;
