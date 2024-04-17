import { GoPerson } from "react-icons/go";
import { IoLogOutOutline } from "react-icons/io5";
import { MdBookmarkBorder } from "react-icons/md";
import { LuCalendarClock } from "react-icons/lu";
import React, {useState, useEffect, useRef} from 'react';
import user from "/profil.svg"
function Notifications() {

  const [open, setOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {

    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
        console.log(menuRef.current);
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });

  return (
    <div >
      <div className='menu-container' ref={menuRef}>
        <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
          <img src={user} alt="user " className="object-contain w-9 "></img>
        </div>

        <div className={`absolute top-[60px] shadow-md shadow-[#6D6D6D] rounded-b-lg p-4 bg-[#fff] w-[250px] right-2 before:absolute before:top-[-5px] before:right-[20px] before:transform before:rotate-45 before:h-[20px] before:w-[20px] before: dark:bg-darkmode ${open? 'opacity-100 visible translate-y-0 ' : 'opacity-0 invisible -translate-y-20 '}`} >
        <ul>
            <li className = 'flex gap-2 items-center py-2 border-t-[#6D6D6D]/50 border-t-[1px]  text-black hover:text-[#0051CB] border-none '><GoPerson className="text-lg"/> <a href="">Personal informations</a> </li>
            <li className = 'flex gap-2 items-center py-2 border-t-[#6D6D6D]/50 border-t-[1px]  text-black hover:text-[#0051CB]'> <LuCalendarClock className="text-lg"/><a href="">Booking history</a></li>
            <li className = 'flex gap-2 items-center py-2 border-t-[#6D6D6D]/50 border-t-[1px]  text-black hover:text-[#0051CB]'><MdBookmarkBorder className="text-lg"/><a href="">Favorite properties</a></li>
            <li className = 'flex gap-2 items-center py-2 border-t-[#6D6D6D]/50 border-t-[1px]  text-black hover:text-[#0051CB]'><IoLogOutOutline className="text-lg"/><a href="">Log out</a></li>
        </ul>
        </div>
      
      </div>
    </div>
  );
}


export default Notifications;