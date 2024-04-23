import UserGreeting from "./UserGreeting";
import { selectCurrentUser } from "../../app/slices/authSlice";
import { useSelector } from "react-redux";

function Header()  {
  const user = useSelector(selectCurrentUser)
  // console.log('useskdjgaldjsgklajsdkgjaskdjgalr', user)
  const isSignedUp = !!user
  const isJoined = user?.extra?.stripeAccountId

    return (
      <header>
        <div className="py-3 px-0 mx-0 fixed z-50 w-full shadow-lg bg-white dark:bg-darkmode left-0 top-0">
          <div className="px-6 mx-auto flex justify-between items-center gap-[3px] lg:gap-[40px] md:gap-[5px] flex-row">
            <a href="/"><img src="/src/assets/logo.svg" alt="logo-img" className="object-contain w-20 md:mr-3 lg:mr-0" /></a>
            <UserGreeting isSignedUp={isSignedUp} isJoined={isJoined} user={user} />
          </div>
        </div>
      </header>
    );
  }

export default Header;





