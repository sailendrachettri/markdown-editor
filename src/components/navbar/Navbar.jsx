import React, { useState } from 'react'

const Navbar = ({themeMode, setThemeMode}) => {

  const handleChangeTheme = ()=>{
    if(themeMode === "dark"){
      setThemeMode("light");
    }
    else{
      setThemeMode('dark')
    }
  }

  return (
    <div onClick={()=>{handleChangeTheme()}}>Toggle theme</div>
  )
}

export default Navbar