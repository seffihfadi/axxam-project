import { useState } from 'react';
import Signup4 from '../signup/Signup4';
import BankInfo from './BankInfo';

function Joinus() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBankOpen, setIsBankOpen] = useState(false);

  function handleClose() {
    setIsOpen(false);
    setIsBankOpen(false);

  }

  function handleOpen() {
    setIsOpen(true);
  }

  const openPopupBank = () => {
    setIsBankOpen(true);
    setIsOpen(false)
  }
 

  return (
    <>
      <button onClick={handleOpen} className='primary'>Join Us</button>
      {isOpen && <Signup4 isOpen={isOpen} openPopupBank={openPopupBank} isJoin={true} />}
      {isBankOpen && <BankInfo handleClose={handleClose} isOpen={isBankOpen} />}
    </>
  )
}

export default Joinus


