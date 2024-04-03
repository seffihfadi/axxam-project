import React from 'react'
import Image from '../../../public/bg4.jpg'
import { HiOutlineCamera } from "react-icons/hi2";
function Form() {
  const userinfo ={
    FullName:"Bouzidi Ahmad",
    PhoneNumber:"+213 559 65 21 95",
    Birthdate:"22/05/2001",
    Gender:"Male",
    Biography:"Not provided",
    Address:"Not provided",
    image:Image,
  }
  const birthdateParts = userinfo.Birthdate.split('/');
  const formattedBirthdate = `${birthdateParts[2]}-${birthdateParts[1]}-${birthdateParts[0]}`;
  return (
    <div className=' container  my-24'>
      <h1 className=" md:pt-3 md:pb-20 pb-12 font-bold text-xl  ">Main Informations</h1>
      <div className='md:grid md:grid-cols-[3fr,1fr] flex-wrap-reverse  flex  '>
        <div>
          <div className='pb-32 flex justify-center flex-col'>
            <form className=''>
              <div className="main">
                <input id="Fullname" name="Fullname" type="text" placeholder={userinfo.FullName} required />
                <label htmlFor="Fullname">Full name</label>
              </div>
              <div className="main">
                <input id="phonenumber" name="phonenumber" type="tel" placeholder={userinfo.PhoneNumber}  required />
                <label htmlFor="Fullname">Phone number</label>
              </div>
              <div className="main date">
                <input id="birthdate" name="birthdate" type="date" placeholder={formattedBirthdate} required />
                <label htmlFor="birthdate">Birthdate</label>
              </div>
            </form>
            <button className='primary info'>Save</button>
          </div>
             <div>
             <h1 className="pb-10 pt-3 md:pb-20 font-bold text-xl  ">Additional informations</h1>
               <form>
                <div className="main ">
                   <select name="" id="sdf "className='' >
                      <option value="Male" className=' darktxt dark:bg-darkmode' >Male</option>
                      <option value="Female" className='darktxt dark:bg-darkmode'>Female</option>
                  </select>
                 <label htmlFor="sdf" >Gender</label>
                </div>
                  <div className="main">
                   <input id="pBiography" name="Biography" type="text" placeholder={userinfo.Biography} required />
                   <label htmlFor="Biography">Biography</label>
                 </div>
                 <div className="main">
                   <input id="Address" name="Address" type="text" placeholder={userinfo.Biography} required />
                   <label htmlFor="Address">Address</label>
                 </div>
                </form>
                <button className='primary info'>Save</button>
             </div>
        </div>
        <div className='lg:pl-10 relative'>
           <div className='lg:w-44 lg:h-44 flex  sticky  md:w-36 md:h-36 w-28 h-28  '>
            <img src={userinfo.image} className=' rounded-full'/>
            <div className='absolute  lg:left-9 left-8 bottom-[-15px] '>
                <button className='flex gap-3 items-center justify-center lg:px-7 px-4  shadow-md  py-2 rounded-3xl font-semibold text-sm  w-fit   bg-whitemode dark:bg-gray-400  '>
                  <span><HiOutlineCamera/></span>
                  <span className='darktxt' >Edit</span>
                </button>
          </div>
          </div>
          
        </div>
     </div>
  </div>
  )
}

export default Form
