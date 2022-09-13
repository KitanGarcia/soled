import type { NextPage } from 'next';
import Head from 'next/head';
import React, {useState} from 'react';

import styles from '../styles/Home.module.css';
import CourseCard from '../components/CourseCard';
import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';

import CourseGrid from '../components/CourseGrid';
import Form from '../components/Form'

const MyCourses: NextPage = () => {
    // const [showModal, setShowModal] = useState{false};

    const handleClick = () =>{
        console.log('clicked button');
        // setShowModal(!showModal);
    }

    return (
        <div className={styles.container}>
            <NavBar></NavBar>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    All of my courses
                </h1>

                Option to view and add courses here
                <button onClick={() => handleClick()}>
                    <h1 className={styles.button}>
                        Add Course
                    </h1>
                  
                    
                </button>
            </main>
            
            
            <Footer />
        </div>

    );
};

export default MyCourses;
