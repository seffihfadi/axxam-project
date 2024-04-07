
import UserGreeting from "./UserGreeting";
import { FaTimes } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Component } from "react";
import ThemeToggle from "./ThemeToggle";

class Header extends Component {

  state = { clicked: false }

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  }

  render(){
    return (
      <section>
        <div className="  py-3 px-0 mx-0 fixed z-50 w-full shadow-lg bg-white dark:bg-darkmode left-0 top-0">
          <div className="px-6 mx-auto flex justify-between items-center gap-[3px] lg:gap-[40px] md:gap-[5px] flex-row">
            <a href="/"><img src="/src/assets/logo.svg" alt="logo-img" className="object-contain w-20 md:mr-3 lg:mr-0" /></a>
            <nav className="flex items-center gap-[5px] lg:gap-[150px] md:gap-[18px] sm:flex-row">
              <div   className={ this.state.clicked  ? "navbar active w-full items-center font-semibold bg-white dark:bg-darkmode  h-[30px] lg:gap-[35px] md:gap-[15px]  " : "navbar  items-center font-semibold h-[30px] lg:gap-[35px] md:gap-[15px] "} >
                <a href="/Home" className="brd">Home</a>
                <a href="/Our services" className="brd">Our services</a>
                <a href="/Properties" className="brd">Properties</a>
                <a href="/Contact Us" className="brd">Contact Us</a>
               <div className="md:hidden"> <ThemeToggle  /></div> 
              </div >
              <div className="flex items-center gap-[8px] sm:gap-[20px]   md:gap-[20px]">
                <UserGreeting isLoggedIn={true} isJoined={true} />
                 <div className=" hidden md:block"><ThemeToggle  /></div>
              </div>
              
               <div   className=" mobile pl-1 sm:pl-[20px] " onClick={this.handleClick}>
                  {this.state.clicked ? <FaTimes className="text-lg" /> : <GiHamburgerMenu className="text-lg" />}
               </div>
            </nav>
          </div>
        </div>
      </section>
    );
  }
}

export default Header;







