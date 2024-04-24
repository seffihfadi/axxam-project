import React from 'react';
import { IoCheckmark , IoAlarmOutline} from "react-icons/io5";
import { RiProhibitedLine } from "react-icons/ri";
import { PiBedLight } from "react-icons/pi";
import { GiTrophyCup } from "react-icons/gi";
import { FaXmark } from "react-icons/fa6";
function BHistoryCard({ props }) {
    return (
   <div className="flex flex-wrap cursor-pointer mb-9">
      <div className="w-full h-[300px] lg:h-[220px] mb-2  overflow-hidden rounded-2xl">
        <img
          src={props.image}
          className="h-full w-full"
        />
        </div>
      <div className="flex justify-between w-full mt-1  ">
          <span className="font-semibold darktxt">
            {props.location}
          </span>
          <span className="text-secondary text-[15px] font-light block mb-2 leading-6  darktxt">
            {props.date}
          </span>
      </div>
      <div className="flex justify-between w-full text-[15px] font-semibold pb-3 ">
          <span className=' darktxt'>
            {props.price} x 7 nights
          </span>
          <span className=' darktxt'>
            250000 DZD
          </span>
      </div>
      <div className='w-full '>
        {props.status == "accepted" ?(
          <button className='BookingButton bg-green-600  '>
            <span>Confirmed</span>
            <span><IoCheckmark size={15} /></span>
          </button>
       ): props.status == "rejected" ? (
         <button className=' BookingButton bg-red-600 dark:bg-red-700'>
           <span>Rejected</span>
           <span><FaXmark size={15} /></span>
         </button>
       ):props.status == "pending" ? (
        <button className='BookingButton bg-orange-500 dark:bg-orange-600 '>
        <span>Pending</span>
        <span><IoAlarmOutline size={15}/></span>
       </button>
       ):props.status == "completed" ? (
        <button className='BookingButton bg-gray-400 dark:bg-gray-500 '>
        <span>Completed</span>
        <span><GiTrophyCup size={15} /></span>
       </button>
       )
       :props.status == "cancelled" ?(
        <button className='BookingButton  bg-red-600 dark:bg-red-700  '>
        <span>Cancelled</span>
        <span><RiProhibitedLine size={15}/></span>
       </button>
       )
       :props.status == "inprogress" ?(
       <div className='flex justify-between '> 
        <button className=' flex gap-2 px-3 items-center rounded-lg bg-primary dark:bg-blue-800 font-semibold text-sm '>
        <span className='text-white '>In progress</span>
        <span ><PiBedLight color="white" size={15} /></span>
       </button>
        <button className=' flex  gap-2 items-center justify-center px-14 py-2 rounded-lg bg-gray-300 dark:bg-gray-500  font-semibold text-sm  w-fit lg:w-1/3 '>
        <span className='text-gray-500'>Cancel</span>
       </button>
       </div>
       ):(<></>)
      }
      </div>
    </div>
    )
  }

export default BHistoryCard
