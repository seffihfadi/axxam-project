
import { MdNotificationsNone } from "react-icons/md";
import Notifications from "./Notifications";
function UserGreeting(props) {
  if (props.isLoggedIn && props.isJoined) {
    return(
      <div className="flex items-center gap-[8px] sm:gap-[20px] md:max-w-full md:gap-[10px] ">
        <MdNotificationsNone  className="text-xl"/>
        <Notifications />
        

      </div>
    );
  } else if (props.isLoggedIn) {
    return (
      <div className="flex items-center gap-[8px] sm:gap-[20px] md:max-w-full md:gap-[10px]">
         <button className="hed2  ">Join us</button>
         <MdNotificationsNone  className="text-xl"/>
         <Notifications />
        
      </div>
    );
  } else {
    return(
    <div className="flex items-center gap-[8px] sm:gap-[20px] md:max-w-full md:gap-[10px]">
      <button className="hed2 border-none ">Join us</button>
      <button className="hed ">Sign up</button>
     
    </div>
     );
  }
}

export default UserGreeting;