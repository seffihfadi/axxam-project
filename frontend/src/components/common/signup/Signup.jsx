import React from 'react'
import { useState } from 'react';
import Signup1 from './Signup1';
import Signup2 from './Signup2';
import Signup3 from './Signup3';

function Signup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPopup2Open, setIsPopup2Open] = useState(false);
  const [isPopup3Open, setIsPopup3Open] = useState(false);
  const [inputValue, setInputValue] = useState('')

  function handleClose() {
    setIsOpen(false);
    document.body.classList.remove("popup-open");
  }

  function handleOpen() {
    setIsOpen(true);
    document.body.classList.add("popup-open");
  }

  const openPopup2 = () => {
    setIsPopup2Open(true);
    setIsOpen(false)
  }

  const openPopup3 = () => {
    setIsPopup3Open(true);
    setIsPopup2Open(false);
  }
  
  function handleBack() {
    setIsPopup2Open(false);
    setIsOpen(true);
  }

  function handleBack2() {
    setIsPopup3Open(false);
    setIsPopup2Open(true);
  }

  return (
    <>
      <button onClick={handleOpen} className='Secondary'>Signup</button>
      {isOpen && <Signup1 isOpen = {isOpen} setIsOpen={setIsOpen} openPopup2={openPopup2} handleClose={handleClose} inputValue={inputValue} setInputValue={setInputValue}/>}
      {isPopup2Open && <Signup2 isOpen={isPopup2Open} handleBack={handleBack} number={inputValue} openPopup3={openPopup3}/>}
      {isPopup3Open && <Signup3 isOpen={isPopup3Open} handleBack={handleBack2}/>}
    </>
  )
}

export default Signup


