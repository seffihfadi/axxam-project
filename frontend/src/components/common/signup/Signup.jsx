import React from 'react'
import { useState } from 'react';
import Signup1 from './Signup1';
import Signup2 from './Signup2';

function Signup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPopup2Open, setIsPopup2Open] = useState(false);
  const [inputValue, setInputValue] = useState('')

  function handleClose() {
    setIsOpen(false);
    document.body.classList.remove("popup-open");
  }
  const openPopup2 = () => {
    setIsPopup2Open(true);
    setIsOpen(false)
  }
  function handleOpen() {
    setIsOpen(true);
    document.body.classList.add("popup-open");
  }

  function handleBack() {
    setIsPopup2Open(false);
    setIsOpen(true);
  }

  return (
    <>
      <button onClick={handleOpen} className='Secondary'>Signup</button>
      {isOpen && <Signup1 isOpen = {isOpen} setIsOpen={setIsOpen} openPopup2={openPopup2} handleClose={handleClose} inputValue={inputValue} setInputValue={setInputValue}/>}
      {isPopup2Open && <Signup2 isOpen={isPopup2Open} setIsOpen={setIsPopup2Open} handleBack={handleBack} number={inputValue}/>}
    </>
  )
}

export default Signup


