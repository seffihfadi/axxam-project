
import { useEffect } from "react";
import { useRef } from "react";
const Header = () => {
  const headerRef = useRef();
//   useEffect( () =>{
// window.addEventListener("scroll" , () => {
//   if ( window.scrollY > 100 ){
// headerRef.current.style.background = " #EEEEEE" ;
// headerRef.current.style.padding  = " 20px 20px "
//   }else {
//     headerRef.current.style.background = " #F7F7F7" ;
//     headerRef.current.style.padding  = " 0px 20px"
//   }})})
  return (
    <header ref={headerRef} className ="px-6 z-50 bg-white shadow-lg py-3 fixed w-full left-0 flex justify-between items-center top-0"> 
      <img src=" /src/assets/logo.svg" alt="logo-img" className="cursor-pointer object-contain h-8"/>
      <nav className="justify-center items-center gap-5 hidden md:flex">
        <a href="/Home"> Home </a>
        <a href="/Ourservices"> Our services </a>
        <a href="/Properties">Properties </a>
        <a href="/ContactUs">Contact Us</a>
      </nav>
      <div className="flex gap-3">
        <button className="secondary-sq">Join us</button>
        <button className="primary">Signup</button>
      </div>
    </header>
  )
}

export default Header ;
