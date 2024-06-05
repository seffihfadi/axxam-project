import UserGreeting from "./UserGreeting";
import { selectCurrentUser } from "../../app/slices/authSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Header()  {
  const user = useSelector(selectCurrentUser)
  const isSignedUp = !!user
  const isJoined = !!user && !!user?.extra?.stripeAccountId

  // console.log('isSignedUp', isSignedUp, isJoined)

    return (
      <header>
        <div className="py-3 px-0 mx-0 fixed z-50 w-full shadow-lg bg-white dark:bg-darkmode left-0 top-0">
          <div className="px-6 mx-auto flex justify-between items-center gap-[3px] lg:gap-[40px] md:gap-[5px] flex-row">
            <Link to="/"><img src="/src/assets/logo.svg" alt="logo-img" className="object-contain w-20 md:mr-3 lg:mr-0" /></Link>
            <UserGreeting isSignedUp={isSignedUp} isJoined={isJoined} user={user}  /> 
          </div>
        </div>
      </header>
    );
  }

export default Header;

