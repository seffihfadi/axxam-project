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

        <div className={`dropdown-menu dark:bg-darkmode ${open? 'active' : 'inactive'}`} >
        <ul>
            <li className = 'dropdownItem border-none '><GoPerson className="text-lg"/> <a href="">Personal informations</a> </li>
            <li className = 'dropdownItem'> <LuCalendarClock className="text-lg"/><a href="">Booking history</a></li>
            <li className = 'dropdownItem'><MdBookmarkBorder className="text-lg"/><a href="">Favorite properties</a></li>
            <li className = 'dropdownItem'><IoLogOutOutline className="text-lg"/><a href="">Log out</a></li>
        </ul>
        </div>
      
      </div>
    </div>
  );
}


export default Notifications;