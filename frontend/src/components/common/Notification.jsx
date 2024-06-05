import { GoPerson } from "react-icons/go";
import { IoLogOutOutline, IoAdd } from "react-icons/io5";
import { MdBookmarkBorder } from "react-icons/md";
import { LuCalendarClock } from "react-icons/lu";
import React, {useState, useEffect, useRef} from 'react';
import Image from "./Image";
import { useSignoutMutation } from "../../features/auth/authApiSlice";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Notification({user, isSignedUp, isJoined}) {

  const [open, setOpen] = useState(false);
  // const navigate = useNavigate()
  let menuRef = useRef();
  const [signOut] = useSignoutMutation()

  useEffect(() => {

    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
        // console.log(menuRef.current);
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });
  const handleLogout = async () => {
    signOut()
    window.location.href = '/'
  }
  if (isSignedUp && !isJoined) {
    return (
      <div >
        <div className='menu-container' ref={menuRef}>
          <div className='menu-trigger' onClick={()=>{setOpen(!open)}}> 
            <div className="w-9 aspect-square">
              <Image src={user.avatar} userName={user.fullname} alt="user" className="flex-shrink-0 rounded-full w-9 h-9 flex overflow-hidden " />
            </div> 
          </div>
          <div className={`lnkdrp absolute top-[65px] shadow-md rounded-b-lg p-4 bg-[#fff] w-[250px] right-2 before:absolute before:top-[-5px] before:right-[20px] before:transform before:rotate-45 before:h-[20px] before:w-[20px] before: dark:bg-darkmode ${open? 'opacity-100 visible translate-y-0 ' : 'opacity-0 invisible -translate-y-20 '}`} >
          <ul>
              <li className = 'flex gap-2 items-center py-3 text-black hover:text-[#0051CB] border-none '>
                <GoPerson className="text-lg"/> <Link to={'/info'}>Personal informations</Link>
              </li>
              <li className = 'flex gap-2 items-center py-3 text-black hover:text-[#0051CB]'>
                <LuCalendarClock className="text-lg"/><Link to={'/history'}>Booking history</Link>
              </li>
              <li className = 'flex gap-2 items-center py-3 text-black hover:text-[#0051CB]'>
                <MdBookmarkBorder className="text-lg"/><Link to={"/favourite"}>Favorite properties</Link>
              </li>
              <li className = 'flex gap-2 items-center py-3 text-black hover:text-[#0051CB]'>
                <button onClick={handleLogout} className="secondary flex justify-center items-center gap-2"><IoLogOutOutline className="text-lg"/>Log out</button>
              </li>
          </ul>
          </div>
        
        </div>
      </div>
    );
  }
  else  {
    return (
      <div >
        <div className='menu-container' ref={menuRef}>
          <div className='menu-trigger' onClick={()=>{setOpen(!open)}}> 
            <div className="w-9 aspect-square">
              <Image src={user.avatar} userName={user.fullname} alt="user" className="flex-shrink-0 rounded-full w-9 h-9 flex overflow-hidden " />
            </div> 
          </div>
          <div className={`lnkdrp absolute top-[65px] shadow-md rounded-b-lg p-4 bg-[#fff] w-[250px] right-2 before:absolute before:top-[-5px] before:right-[20px] before:transform before:rotate-45 before:h-[20px] before:w-[20px] before: dark:bg-darkmode ${open? 'opacity-100 visible translate-y-0 ' : 'opacity-0 invisible -translate-y-20 '}`} >
          <ul>
              <li className = 'flex gap-2 items-center py-3 text-black hover:text-[#0051CB] border-none '>
                <GoPerson className="text-lg"/> <Link to={'/dashboard/info'}>Personal informations</Link>
              </li>
              <li className = 'flex gap-2 items-center py-3 text-black hover:text-[#0051CB]'>
                <LuCalendarClock className="text-lg"/><Link to={'/dashboard/ad'}>Manage properties</Link>
              </li>
              <li className = 'flex gap-2 items-center py-3 text-black hover:text-[#0051CB]'>
                <IoAdd className="text-lg"/><Link to={"/dashboard/ae"}>Add property</Link>
              </li>
              <li className = 'flex gap-2 items-center py-3 text-black hover:text-[#0051CB]'>
                <button onClick={handleLogout} className="secondary flex justify-center items-center gap-2"><IoLogOutOutline className="text-lg"/>Log out</button>
              </li>
          </ul>
          </div>
        </div>
      </div>
    );
  }
}


export default Notification;