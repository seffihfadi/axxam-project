import { useEffect } from "react";
import { useRef } from "react";
const Header = () => { 
 
      const headerRef = useRef();
  return (
<section>
  <div  ref={headerRef}  className ="py-3  px-1   fixed z-50 w-full shadow-lg bg-white dark:bg-darkmode left-0 top-0"> 
    <div className="px-6 mx-auto flex justify-between items-center gap-[10px] lg:gap-[40px]  md:gap-[10px] flex-row ">
      <a href="/"> <img src=" /src/assets/logo.svg "  alt="logo-img" className=" object-contain w-20 md:mr-3 lg:mr-0  "/> </a>
      <nav className="flex items-center gap-[10px] lg:gap-[150px] md:gap-[50px]  sm:flex-row">
        <div className=" md:flex hidden sm:hidden  items-center  font-semibold  h-[30px]  gap-[15px] lg:gap-[35px] md:gap-[15px]  md:max-w-full     ">
              <a href="/Home" className="brd"> Home </a>     
              <a href="/Our services" className="brd"> Our services </a>
              <a href="/Properties" className="brd">Properties </a>
              <a href="/Contact Us" className="brd">Contact Us  </a>  
        </div>
        <div className=" flex items-center gap-[8px] sm:gap-[20px] md:max-w-full md:gap-[15px] ">     
              <button className="secondary-sq border-none  h-[40px] element-center ">JOIN US</button>
              <button className="primary  h-[40px] element-center   ">SIGN UP</button>
        </div>
      </nav>
    </div>
  </div>
</section>
  )
}

export default Header ;


