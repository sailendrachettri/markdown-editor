import React, { useEffect, useState } from 'react';
import Editor from '../editor/Editor';
import Intro from '../intro/Intro';

const Homepage = () => {
    const [showIntro, setShowIntro] = useState(true);
    const [slideUp, setSlideUp] = useState(false);

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setSlideUp(true); 
        }, 1000); 

        const timer2 = setTimeout(() => {
            setShowIntro(false); 
        }, 1600); 

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    return (
        <div>
            {showIntro ? (
                <div className={`intro-wrapper ${slideUp ? 'slide-up' : ''}`}>
                    <Intro />
                </div>
            ) : (
                <Editor />
            )}
        </div>
    );
};

export default Homepage;
