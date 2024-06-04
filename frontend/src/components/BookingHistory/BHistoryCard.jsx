import React from 'react';
import { IoCheckmark , IoAlarmOutline} from "react-icons/io5";
import { RiProhibitedLine } from "react-icons/ri";
import { PiBedLight } from "react-icons/pi";
import { GiTrophyCup } from "react-icons/gi";
import { FaXmark } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { getDaysInMonth } from 'date-fns';
import { useHandleCancelMutation } from '../../features/reservations/reservationApiSlice';
import { setAlert } from '../../app/slices/alertSlice';
import { useDispatch } from 'react-redux';
import { calculateTotalPrice } from '../../../../backend/utils/func';

function BHistoryCard({ props }) {
  console.log('props', props)
  const [cancelRes, {isLoading}] = useHandleCancelMutation()
  const dispatch = useDispatch()
  const handleCancel = async () => {
    await cancelRes(props._id)
      .unwrap()
      .then((payload) => dispatch(setAlert([payload.message, 'success'])))
      .catch((error) => dispatch(setAlert([error.data.message, 'error'])))
  }

    return (
      <div className="flex flex-wrap mb-9">
      <Link to={`/property/${props.announcement._id}`}>
      <div className="w-full h-[300px] lg:h-[220px] mb-2  overflow-hidden rounded-2xl">
        <img
          src={props.announcement.images[0].secure_url}
          className="h-full w-full"
        />
        </div>
      <div className="flex justify-between w-full mt-1  ">
          <span className="font-semibold darktxt">
            {props.announcement.location.name}
          </span>
          <span className="text-secondary text-[15px] font-light block mb-2 leading-6  darktxt">
            {props.checkin.slice(0,10)}
          </span>
      </div>
      <div className="flex justify-between w-full text-[15px] font-semibold pb-3 ">
          <span className=' darktxt'>
            {props.announcement.price} x {props.checkout.slice(8,10)-props.checkin.slice(8,10) > 0 ? props.checkout.slice(8,10)-props.checkin.slice(8,10) : props.checkout.slice(8,10)+getDaysInMonth(props.checkin.slice(5,7)-1) - props.checkin.slice(8,10)}
          </span>
          <span className=' darktxt'>
            {calculateTotalPrice(parseInt(props.checkout.slice(8,10)-props.checkin.slice(8,10) > 0 ? props.checkout.slice(8,10)-props.checkin.slice(8,10) : props.checkout.slice(8,10)+getDaysInMonth(props.checkin.slice(5,7)-1) - props.checkin.slice(8,10)), props.announcement, props.guests)} DZD
          </span>
      </div>
    </Link>
      <div className='w-full '>
        {props.status == "rejected" ? (
         <button className=' BookingButton bg-red-600 dark:bg-red-700'>
           <span>Rejected</span>
           <span><FaXmark size={15} /></span>
         </button>
       ):props.status == "pending" ? (
        <button className='BookingButton bg-orange-500 dark:bg-orange-600 '>
        <span>Pending</span>
        <span><IoAlarmOutline size={15}/></span>
       </button>
       ):props.status == "accepted" && Date.now() > new Date(props.checkout).getTime() ? (
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
       :props.status == "accepted" && Date.now() > new Date(props.checkin).getTime() && Date.now() < new Date(props.checkout).getTime() ?(
       <div className='flex justify-between '> 
        <button className=' flex gap-2 px-3 items-center rounded-lg bg-primary dark:bg-blue-800 font-semibold text-sm '>
        <span className='text-white '>In progress</span>
        <span ><PiBedLight color="white" size={15} /></span>
       </button>
        <button disabled={isLoading} onClick={handleCancel} className=' flex  gap-2 items-center justify-center px-14 py-2 rounded-lg bg-gray-300 dark:bg-gray-500  font-semibold text-sm  w-fit lg:w-1/3 '>
        Cancel
       </button>
       </div>
       ): props.status == "accepted" ?(
        <button className='BookingButton bg-green-600  '>
          <span>Accepted</span>
          <span><IoCheckmark size={15} /></span>
        </button>
      ) :(<></>)
      }
      </div>
    </div>
    )
  }

export default BHistoryCard
