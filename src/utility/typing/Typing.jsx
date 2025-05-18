import React from 'react';
import { ReactTyped } from "react-typed";

const Typing = () => {
  return (
    <>
    <ReactTyped
     strings={["Open source powers most of the internet.", "Git was created by Linus Torvalds.", "The first computer bug was a literal moth.", "Over 700 programming languages exist.", "Ada Lovelace was the first programmer.","Hello, World! is the classic starter program."]}
     typeSpeed={80}
     loop={true}
     backSpeed={50}
    backDelay={3000}
     />
    </>
  )
}

export default Typing