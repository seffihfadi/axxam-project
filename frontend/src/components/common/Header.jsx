
import { useEffect } from "react";
import { useRef } from "react";
const Header = () => {
  const headerRef = useRef();
  useEffect( () =>{
window.addEventListener("scroll" , () => {
  if ( window.scrollY > 100 ){
headerRef.current.style.background = " #EEEEEE" ;
headerRef.current.style.padding  = " 20px 20px "
  }else {
    headerRef.current.style.background = " #F7F7F7" ;
    headerRef.current.style.padding  = " 0px 20px"
  }})})
  return (
    <section>
    <div  ref={headerRef}  className ="  pb-[60px] pt-[60px] fixed z-10000000 w-full  lef-0 top-0 transition-all duration-200   "> 
      <div className=" px-[20px] mx-auto   flex justify-between items-center gap-[20px] lg:gap-[40px]  md:gap-[10px] flex-col md:flex-row  ">
      <a href="/"> <img src=" /src/assets/logo.svg "  alt="logo-img" className=" object-contain w-[112,99px] h-[48.59px]  md:mr-3 lg:mr-0 "/> </a>
      <nav className="flex items-center gap-[20px] lg:gap-[70px] md:gap-[10px] flex-col md:flex-row">
      <ul className="flex  items-center  font-semibold  h-[30px] gap-[15px] lg:gap-[25px] md:gap-[10px]  md:max-w-full     ">
            <li className="brd"><a href="/ Home"> Home </a></li>   
            <li className="brd"><a href="/Our services"> Our services </a></li>
            <li className="brd "><a href="/Properties">Properties </a></li>
            <li className="brd"><a href="/Contact Us">Contact Us  </a></li>   
            <li className="brd"><a href="/">  </a></li>   
        </ul>
        <ul className=" flex items-center  gap-[15px] md:max-w-full md:gap-[15px] ">
            <li>
            <a href="/" className="btn w-[130px] h-[40px] md:w-[100px] md:h-[35px]  lg:w-[130px] lg:h-[40px] text-[#0051CB] font-medium  element-center rounded-[10px] ">
                   SIGN UP   
                  </a>
            </li>
            <li>
            <a href="/" className="btn w-[130px] h-[40px] md:w-[100px] md:h-[35px]  lg:w-[130px] lg:h-[40px]  text-white bg-[#0051CB] element-center font-medium  rounded-[10px] ">
                   JOIN US  
                  </a>
            </li>
        </ul>

      </nav>
      </div>
    </div>
    </section>
  )
}

export default Header ;
