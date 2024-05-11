import React, { useState } from 'react';
import ThemeToggle from "./ThemeToggle";
import Signup from "../auth/signup/Signup";
import Joinus from '../auth/joinus/Joinus';
import { FaTimes } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import Notification from "./Notification";
import { Link } from 'react-router-dom';
import NotificationPopup from './NotificationPopup';

function UserGreeting({ isSignedUp, isJoined,user }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  if (isSignedUp && isJoined) {
    return (
      <nav className="flex items-center gap-[5px] lg:gap-[39px] md:gap-[10px] sm:flex-row">
        <div className={clicked ? "navbar active dark:bg-darkmode gap-5 bg-white font-semibold" : "navbar flex items-center font-semibold lg:font-medium lg:gap-[15px] md:gap-[13px] "}>
          <Link to="//" className="brd">Dashboard</Link>
          <Link to="/sl" className="brd">Properties</Link>
          <Link to="//" className="brd">Booking</Link>
          <div className="md:hidden"><ThemeToggle /></div>
        </div>
        <div className="flex items-center gap-[15px]  lg:gap-[7px] ">
          <div className="flex items-center  gap-2 sm:gap-[7px] ">
            <div className="hidden md:block"><ThemeToggle /></div>
            <NotificationPopup /> 
            <Notification user={user} />
          </div>
        </div>
        <div className="block md:hidden  pl-1 sm:pl-[20px]" onClick={handleClick}>
          {clicked ? <FaTimes className="text-lg" /> : <GiHamburgerMenu className="text-lg" />}
        </div>
      </nav>
    );
  } else if (isSignedUp && !isJoined) {
    return (
      <nav className="flex items-center gap-[5px] lg:gap-[150px] md:gap-[36px] sm:flex-row">
        <div className={clicked ? "navbar active font-semibold dark:bg-darkmode gap-5 bg-white" : "navbar flex items-center font-semibold lg:gap-[35px] md:gap-[13px] "}>
        <Link to="/" className="brd">Home</Link>
          <Link to="/services" className="brd">Services</Link>
          <Link to="/sl" className="brd">Properties</Link>
          <div className="md:hidden"><ThemeToggle /></div>
        </div>
        <div className="flex items-center gap-[7px] sm:gap-[12px] md:gap-[15px]">
          <div className="flex items-center gap-2 sm:gap-[7px] md:max-w-full">
            <Joinus />
            <div className="hidden md:block"><ThemeToggle /></div>
            <NotificationPopup />
            <Notification user={user} />
          </div>
        </div>
        <div className="block md:hidden pl-1 sm:pl-[20px]" onClick={handleClick}>
          {clicked ? <FaTimes className="text-lg" /> : <GiHamburgerMenu className="text-lg" />}
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="flex items-center gap-[5px] lg:gap-[150px] md:gap-[25px] sm:flex-row">
        <div className={clicked ? "navbar active font-semibold dark:bg-darkmode gap-5 bg-white" : "navbar flex items-center font-semibold lg:gap-[35px] md:gap-[13px] "}>
          <Link to="/" className="brd">Home</Link>
          <Link to="/services" className="brd">Services</Link>
          <Link to="/sl" className="brd">Properties</Link>
          <div className="md:hidden"><ThemeToggle /></div>
        </div>
        <div className="flex items-center gap-[6px] sm:gap-[20px] md:gap-[20px]">
          <div className="hidden md:block"><ThemeToggle /></div>
          <div className="flex items-center gap-[4px] sm:gap-[20px] md:max-w-full md:gap-[10px]">
            {/* <button className="secondary">
              Join us
            </button> */}
            <Signup />
        </div>
        </div>
        <div className="block md:hidden pl-1 sm:pl-[20px]" onClick={handleClick}>
          {clicked ? <FaTimes className="text-lg" /> : <GiHamburgerMenu className="text-lg" />}
        </div>
      </nav>
    );
  }
}

export default UserGreeting;
