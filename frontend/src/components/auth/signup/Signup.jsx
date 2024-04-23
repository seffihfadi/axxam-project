import React from 'react'
import { useState } from 'react';
import Signup1 from './Signup1';
import Signup2 from './Signup2';
import Signup3 from './Signup3';
import Signup4 from './Signup4';

function Signup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPopup2Open, setIsPopup2Open] = useState(false);
  const [isPopup3Open, setIsPopup3Open] = useState(false);
  const [isPopup4Open, setIsPopup4Open] = useState(false);
  const [inputValue, setInputValue] = useState('')
  const [title, setTitle] = useState('Signup')

  function handleClose() {
    setIsOpen(false);
    setIsPopup4Open(false);
    setIsPopup2Open(false);
    setIsPopup1SigninOpen(false);
    document.body.classList.remove("popup-open");
  }

  

  function handleOpen() {
    setIsOpen(true);
    document.body.classList.add("popup-open");
  }

  const openPopup1Signin = () => {
    setTitle('Signin');
  }

  const openPopup2 = () => {
    setIsPopup2Open(true);
    setIsOpen(false)
  }

  const openPopup3 = () => {
    setIsPopup3Open(true);
    setIsPopup2Open(false);
  }

  const openPopup4 = () => {
    setIsPopup4Open(true);
    setIsPopup3Open(false);
  }
 

  return (
    <>
      <button onClick={handleOpen} className='Secondary'>Signup</button>
      {isOpen && <Signup1 isOpen={isOpen} openPopup2={openPopup2} openPopup1Signin={openPopup1Signin} handleClose={handleClose} inputValue={inputValue} setInputValue={setInputValue} title={title}/>}
      {isPopup2Open && <Signup2 isOpen={isPopup2Open} number={inputValue} handleClose={handleClose} openPopup3={openPopup3} title={title}/>}
      {isPopup3Open && <Signup3 isOpen={isPopup3Open} number={inputValue} openPopup4={openPopup4}/>}
      {isPopup4Open && <Signup4 isOpen={isPopup4Open} handleClose={handleClose}/>}
    </>
  )
}

export default Signup


