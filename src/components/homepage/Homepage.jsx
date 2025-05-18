import React, { useEffect, useState } from 'react'
import Editor from '../editor/Editor'
import Intro from '../intro/Intro'

const Homepage = () => {
    const [showIntro, setShowIntro] = useState(true);

    useEffect(()=>{
        setTimeout(() => {
            setShowIntro(false);
        }, 1500);
    }, []);

    return (
        <div>
           {showIntro ? 
           <Intro /> :
            <Editor />
         }
        </div>
    );
}

export default Homepage