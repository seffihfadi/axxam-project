import React from 'react'
import { FaCircleCheck } from "react-icons/fa6";


function PointSystem() {

  return (
    <div className='container my-24'>
      <h1 className='text-xl font-semibold mb-10'>Points system</h1>
      <p className='w-[60%]'>For every booking you make as a host, you'll earn points based on the booking value and duration.
      The more bookings you make, the more points you'll accumulate. There are no limits to how many points you can earn!</p>
      <div className='mx-auto my-12 text-center'>
        <div className='h-[200px] w-[200px] relative'>
          <div className='h-full w-full absolute rounded-full border-[1px] border-red-300'>
            <div className='h-[80%] w-[80%]  absolute rounded-full border-[1px] border-blue-200'>

            </div>
          </div>
        </div>
      </div>
      <h1 className='font-semibold'>Benefits of Accumulating Points:</h1>
      <ul className='my-10'>
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