
import UserGreeting from "./UserGreeting";
function Header()  {


  
    return (
      <section>
        <div className="  py-3 px-0 mx-0 fixed z-50 w-full shadow-lg bg-white dark:bg-darkmode left-0 top-0">
          <div className="px-6 mx-auto flex justify-between items-center gap-[3px] lg:gap-[40px] md:gap-[5px] flex-row">
            <a href="/"><img src="/src/assets/logo.svg" alt="logo-img" className="object-contain w-20 md:mr-3 lg:mr-0" /></a>
            <UserGreeting isSignedUp={false} isJoined={false}/>
          </div>
        </div>
      </section>
    );
  }


export default Header;





