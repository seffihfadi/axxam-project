import { useEffect } from "react";
import { useRef } from "react";
import Signup from "../auth/signup/Signup";
const Header = () => {
  const headerRef = useRef();
  return (
    <section>
      <div
        ref={headerRef}
        className="py-3  px-1   fixed z-50 w-full shadow-lg bg-white dark:bg-darkmode left-0 top-0"
      >
        <div className="px-6 mx-auto flex justify-between items-center gap-[10px] lg:gap-[40px]  md:gap-[10px] flex-col md:flex-row ">
          <a href="/">
            {" "}
            <img
              src=" /src/assets/logo.svg "
              alt="logo-img"
              className=" object-contain w-16 md:mr-3 lg:mr-0 "
            />{" "}
          </a>
          <nav className="flex items-center gap-[10px] lg:gap-[70px] md:gap-[10px] flex-col md:flex-row">
            <ul className=" sm:flex hidden  items-center  font-semibold  h-[30px]  gap-[15px] lg:gap-[25px] md:gap-[10px]  md:max-w-full     ">
              <li className="brd">
                <a href="/"> Home </a>
              </li>
              <li className="brd">
                <a href="/Our services"> Our services </a>
              </li>
              <li className="brd ">
                <a href="/Properties">Properties </a>
              </li>
              <li className="brd">
                <a href="/Contact Us">Contact Us </a>
              </li>
              <li className="brd">
                <a href="/"> </a>
              </li>
            </ul>
            <ul className=" flex items-center  gap-[15px] md:max-w-full md:gap-[15px] ">
              <li>
                <Signup />
              </li>
              <li>
                <a href="/" className=" btn  text-white bg-[#0051CB] ">
                  JOIN US
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Header;
