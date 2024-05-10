import React from 'react'
import { FaCircleCheck } from "react-icons/fa6";
import { IoEllipse } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../app/slices/authSlice';

function PointSystem() {
  const user = useSelector(selectCurrentUser)
  const prog = user.extra.points >= user.extra.pointsExtrema ? user.extra.pointsExtrema : user.extra.points;
  const extrema = user.extra.pointsExtrema
  const lessorPoints = user.extra.points
  const isNonFee = user.extra.points >= user.extra.pointsExtrema

 //Progress bar calculations
  const circumference = 2 * Math.PI * 100;
  const progress = (prog/extrema)*100;
  const progressPercentage = progress > 50 ? progress-10 : progress>25 ? progress-5 : progress>10 ? progress-3 : progress;
  const progressOffset = circumference * (1 - progressPercentage / 100);


  return (
    <div className='container my-24'>
      <h1 className='text-xl font-semibold mb-10'>Points system</h1>
      <p className='md:w-[80%] lg:w-[60%] text-sm md:text-base'>For every booking you make as a host, you'll earn points based on the booking value and duration.
      The more bookings you make, the more points you'll accumulate. There are no limits to how many points you can earn!</p>
      <div className='mx-auto my-12 flex lg:flex-row flex-col justify-center gap-14 items-center'>
        <div className='py-4 px-8 border-[1px] border-gray-200 dark:border-gray-600 w-fit lg:h-96 rounded-xl flex flex-col justify-center items-center text-center gap-5 md:gap-8'>
          <h1 className='font-semibold'>Points accumulation <span className='font-semibold text-sm text-green-500'>(level : {parseInt(extrema/500)})</span></h1>
          <div className='h-[200px] w-[200px] rounded-full relative bg-gray-300 dark:bg-gray-400'>
            <div className='absolute h-[80%] w-[80%] flex justify-center items-center rounded-full bg-white dark:bg-darkmode top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'>
              <div className='text-center'>
                <span className='font-semibold text-lg text-green-500'>{lessorPoints}<span className='text-sm'> / {user.extra.pointsExtrema}</span></span><br/>
                <span className='text-gray-600 darktxt'>Points</span>
              </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="200px" height="200px" className='absolute top-0 left-0'>
            <circle cx="100" cy="100" r="90" strokeLinecap="round" fill="none" strokeDasharray={`${circumference}px`} strokeDashoffset={`${progressOffset}px`} transform={`rotate(-90 100 100)`} className="stroke-primary stroke-[20px]" />
            </svg>
          </div>
          <p className='text-gray-500 darktxt w-[300px]'>{isNonFee ? 'Receive complete benefits on your upcoming reservation.' : 'Boost your score and unlock 100% benefits just for you!'}</p>
        </div>
        <div className='py-5 px-8 border-[1px] border-gray-200 dark:border-gray-600 w-fit lg:h-96 rounded-xl flex flex-col justify-between items-center gap-5 md:gap-8'>
        <h1 className='font-semibold'>Points breakdown</h1>
        <img src="/point-breakdown.png" alt="point breakdown" className='h-[200px] w-[200px]' />
        <ul className='text-sm text-gray-500 darktxt'>
          <li className='relative'> <IoEllipse className='text-primary absolute left-[-20px] top-0.5'/>Earn +70 bonus points for every confirmed booking.</li> 
          <li className='relative'><IoEllipse color='#2C073D'className='absolute left-[-20px] top-0.5'/>Earn +140 bonus points for bookings made for durations between 1 and 6 months.</li>
          <li className='relative'><IoEllipse color='#39B8E0' className='absolute left-[-20px] top-0.5'/>Earn +210 bonus points with every perfect average 4.5 rating !</li>
        </ul>
        </div>
      </div>
      <div>
      {/* <div className="relative w-32 mb-5">
      <div className="w-32 h-32 rounded-full border-[10px] border-gray-300">
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-[10px] border-primary rotate-90"
              style={{ clipPath: `polygon(0 0, 100% 0, 100% ${90}%, 0 ${90}%)` }}>
        </div>
      </div>
    </div>*/}
    </div> 
      <h1 className='font-semibold'>Benefits of Accumulating Points:</h1>
      <ul className='mt-10 text-sm md:text-base'>
        <li className='relative mb-5 pl-5'>
          Discounts on platform fees for future bookings.
          <FaCircleCheck className='text-primary absolute top-1 left-0'/>
        </li>
        <li className='relative mb-5 pl-5'>
          Priority placement in search results for your properties.
          <FaCircleCheck className='text-primary absolute top-1 left-0'/>
        </li>
        <li className='relative mb-5 pl-5'>
          VIP status with enhanced visibility and exposure for your listings.
          <FaCircleCheck className='text-primary absolute top-1 left-0'/>
        </li>
        <li className='relative pl-5'>
          Get 100% benefits for your next rental adventure.
          <FaCircleCheck className='text-primary absolute top-1 left-0'/>
        </li>
      </ul>
    </div>
  )
}

export default PointSystem