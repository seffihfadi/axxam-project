
import ThemeToggle from "./ThemeToggle";
import Signup from "../auth/signup/Signup";
import { FaTimes } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdNotificationsNone } from "react-icons/md";
import Notification from "./Notification";
import React, { useState } from "react";

const UserGreeting = ({ isSignedUp, isJoined }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  if (isSignedUp && isJoined) {
    return(
      <nav className="flex items-center gap-[5px] lg:gap-[39px] md:gap-[10px] sm:flex-row">
          <div className={clicked  ?" navbarOwner activee  dark:bg-darkmode  gap-5 bg-white font-semibold " : "navbarOwner flex items-center font-semiblold lg:font-medium lg:gap-[15px] md:gap-[13px] "}>  
                  <a href="/" className="brd ">Property overview</a>
                  <a href="/" className="brd ">Property management</a>
                  <a href="/" className="brd ">Booking management</a>
                  <a href="/" className="brd ">Points system</a>   
                  <div className="lg:hidden"> <ThemeToggle  /></div> 
          </div >
          <div className="flex items-center  gap-[15px]   lg:gap-[7px]">
                  <div className="flex items-center gap-[15px]  lg:gap-[5px] ">
                    <MdNotificationsNone  className="text-xl"/>
                    <Notification />
                  </div>
                  <div className=" hidden lg:block"><ThemeToggle  /></div>
         </div>
         <div   className=" block lg:hidden pl-[12px] " onClick={handleClick}>
          {clicked ? <FaTimes className="text-lg" /> : <GiHamburgerMenu className="text-lg" />}
         </div>
    </nav>
      
    );
  } else if (isSignedUp) {
    return (
      <nav className="flex items-center gap-[5px] lg:gap-[150px] md:gap-[36px] sm:flex-row ">
          <div className={clicked  ?" navbar active font-semibold dark:bg-darkmode  gap-5 bg-white " : "navbar flex items-center font-semibold lg:gap-[35px] md:gap-[13px] "}>  
              <a href="/Home" className="brd">Home</a>     
              <a href="/Our services" className="brd ">Our services</a>
              <a href="/Properties" className="brd ">Properties</a>
              <a href="/Contact Us" className="brd">Contact Us</a>
              <div className="md:hidden"> <ThemeToggle  /></div> 
              
          </div >
          <div className="flex items-center gap-[7px] sm:gap-[12px]   md:gap-[15px]">
              <div className="flex items-center gap-1 sm:gap-[7px]  md:max-w-full">
                 <button className="rounded-lg bg-primary text-black w-fit h-[37px] element-center md:font-semibold font-medium text-sm px-1 py-0 ">
                   Join us
                 </button>
                 <MdNotificationsNone  className="text-xl"/>
                 <Notification /> 
              </div>
              <div className=" hidden md:block"><ThemeToggle  /></div>
          </div>
      
        <div   className=" block md:hidden pl-1 sm:pl-[20px] " onClick={handleClick}>
          {clicked ? <FaTimes className="text-lg" /> : <GiHamburgerMenu className="text-lg" />}
       </div>
    </nav>
      
    );
  } else {
    return(
      <nav className="flex items-center gap-[5px] lg:gap-[150px] md:gap-[25px] sm:flex-row">
         <div className={clicked  ?" navbar active font-semibold dark:bg-darkmode  gap-5 bg-white" : "navbar flex items-center font-semibold lg:gap-[35px] md:gap-[13px] "}>  
              <a href="/" className="brd ">Home</a>     
              <a href="/" className="brd ">Our services</a>
              <a href="/" className="brd ">Properties</a>
              <a href="/" className="brd ">Contact Us</a>
              <div className="md:hidden"> <ThemeToggle  /></div> 
        </div >
         <div className="flex items-center gap-[6px] sm:gap-[20px]   md:gap-[20px]">
              <div className="flex items-center gap-[4px] sm:gap-[20px] md:max-w-full md:gap-[10px]">
                  <button href="/" className="rounded-lg bg-white text-black dark:bg-darkmode  border-[1px] w-fit  border-black h-[37px] element-center md:font-semibold font-medium text-sm px-1 py-0 border-none ">
                      Join us
                  </button>
                  <button href="/" className=" rounded-lg bg-primary text-black w-fit  h-[37px] element-center font-medium md:font-semibold text-sm px-1 py-0">
                      <Signup/> 
                  </button>
     
              </div>
              <div className=" hidden md:block"><ThemeToggle  /></div>
         </div>
           <div   className=" block md:hidden  pl-1 sm:pl-[20px] " onClick={handleClick}>
             {clicked ? <FaTimes className="text-lg" /> : <GiHamburgerMenu className="text-lg" />}
           </div>
       </nav>
   
     );
  }
}

export default UserGreeting;