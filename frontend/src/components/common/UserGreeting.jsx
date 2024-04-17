import { Component } from "react";
import ThemeToggle from "./ThemeToggle";
import Signup from "./signup/Signup";
import { FaTimes } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdNotificationsNone } from "react-icons/md";
import Notifications from "./Notifications";
class UserGreeting extends Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false };
  }
  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });}
  render(){
    const { isLoggedIn, isJoined } = this.props;
  if (isLoggedIn && isJoined) {
    return(
      <nav className="flex items-center gap-[5px] lg:gap-[39px] md:gap-[10px] sm:flex-row">
          <div className={this.state.clicked  ?" navbarOwner activee  dark:bg-darkmode  gap-5 bg-white font-semibold " : "navbarOwner flex items-center font-semiblold lg:font-medium lg:gap-[15px] md:gap-[13px] "}>  
                  <a href="/" className="brd ">Property overview</a>
                  <a href="/" className="brd ">Property management</a>
                  <a href="/" className="brd ">Booking management</a>
                  <a href="/" className="brd ">Points system</a>   
                  <div className="lg:hidden"> <ThemeToggle  /></div> 
          </div >
          <div className="flex items-center  gap-[15px]   lg:gap-[7px]">
                  <div className="flex items-center gap-[15px]  lg:gap-[5px] ">
                    <MdNotificationsNone  className="text-xl"/>
                    <Notifications />
                  </div>
                  <div className=" hidden lg:block"><ThemeToggle  /></div>
         </div>
         <div   className=" block lg:hidden pl-[12px] " onClick={this.handleClick}>
          {this.state.clicked ? <FaTimes className="text-lg" /> : <GiHamburgerMenu className="text-lg" />}
         </div>
    </nav>
      
    );
  } else if (isLoggedIn) {
    return (
      <nav className="flex items-center gap-[5px] lg:gap-[150px] md:gap-[25px] sm:flex-row ">
          <div className={this.state.clicked  ?" navbar active font-semibold dark:bg-darkmode  gap-5 bg-white " : "navbar flex items-center font-semibold lg:gap-[35px] md:gap-[13px] "}>  
              <a href="/Home" className="brd text-black  ">Home</a>     
              <a href="/Our services" className="brd ">Our services</a>
              <a href="/Properties" className="brd ">Properties</a>
              <a href="/Contact Us" className="brd">Contact Us</a>
              <div className="md:hidden"> <ThemeToggle  /></div> 
              
          </div >
          <div className="flex items-center gap-[8px] sm:gap-[15px]   md:gap-[20px]">
              <div className="flex items-center gap-[8px] sm:gap-[8px] md:max-w-full md:gap-[8px]">
                 <button className="rounded-lg bg-primary text-black w-fit h-[40px] element-center md:font-semibold font-medium text-sm px-1 py-0 ">
                   Join us
                 </button>
                 <MdNotificationsNone  className="text-xl"/>
                 <Notifications /> 
              </div>
              <div className=" hidden md:block"><ThemeToggle  /></div>
          </div>
      
        <div   className=" block md:hidden pl-1 sm:pl-[20px] " onClick={this.handleClick}>
          {this.state.clicked ? <FaTimes className="text-lg" /> : <GiHamburgerMenu className="text-lg" />}
       </div>
    </nav>
      
    );
  } else {
    return(
      <nav className="flex items-center gap-[5px] lg:gap-[150px] md:gap-[25px] sm:flex-row">
         <div className={this.state.clicked  ?" navbar active font-semibold dark:bg-darkmode  gap-5 bg-white" : "navbar flex items-center font-semibold lg:gap-[35px] md:gap-[13px] "}>  
              <a href="/" className="brd ">Home</a>     
              <a href="/" className="brd ">Our services</a>
              <a href="/" className="brd ">Properties</a>
              <a href="/" className="brd ">Contact Us</a>
              <div className="md:hidden"> <ThemeToggle  /></div> 
        </div >
         <div className="flex items-center gap-[8px] sm:gap-[20px]   md:gap-[20px]">
              <div className="flex items-center gap-[8px] sm:gap-[20px] md:max-w-full md:gap-[10px]">
                  <button href="/" className="rounded-lg bg-white text-black dark:bg-darkmode  border-[1px] w-fit  border-black h-[40px] element-center md:font-semibold font-medium text-sm px-1 py-0 border-none ">
                      Join us
                  </button>
                  <button href="/" className=" rounded-lg bg-primary text-black w-fit  h-[40px] element-center font-medium md:font-semibold text-sm px-1 py-0">
                      <Signup/> 
                  </button>
     
              </div>
              <div className=" hidden md:block"><ThemeToggle  /></div>
         </div>
           <div   className=" block md:hidden  pl-1 sm:pl-[20px] " onClick={this.handleClick}>
             {this.state.clicked ? <FaTimes className="text-lg" /> : <GiHamburgerMenu className="text-lg" />}
           </div>
       </nav>
   
     );
  }
}}

export default UserGreeting;