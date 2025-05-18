import { useEffect, useState } from 'react';
import Editor from '../editor/Editor';
import Intro from '../intro/Intro';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const Homepage = () => {
    const [showIntro, setShowIntro] = useState(true);
    const [slideUp, setSlideUp] = useState(false);
    const [themeMode, setThemeMode] = useState('light');

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
                <div className={`${themeMode==='dark' ? 'bg-dark text-white' : 'bg-white text-slate-800 '}`}>
                    <Navbar setThemeMode={setThemeMode} themeMode={themeMode} />
                    <Editor themeMode={themeMode} />
                    <Footer  themeMode={themeMode}/>
                </div>
            )}
            
        </div>
    );
};

export default Homepage;
