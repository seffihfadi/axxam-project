import React from 'react';

function BookingRequests({ client }) {
  return (
    <div className='container mt-24'>
      <h1 className="pb-12 pt-3 md:pb-15 font-bold text-xl md:text-left text-center">Booking requests</h1>
      <div className="flex flex-col items-center  gap-9 ">
        {client.map((element) => (
          <div key={element.id} className='border dark:border-gray-600 md:h-[135px]  rounded-xl md:grid md:grid-cols-[1fr,6fr,3fr] p-2 overflow-hidden lg:w-[84%] '>
            <div className='flex flex-col items-center justify-center py-2'>
              <img src={element.picture} className="h-[60px] w-[60px] lg:h-[55px] lg:w-[55px] md:w-[50px] md:h-[50px]  rounded-full " alt={element.name} />
              <span className='font-semibold pt-2 lg:text-base text-[15px]'>{element.fname}.{element.name}</span>
            </div>
            <div className='flex flex-col justify-center pl-3'>
              <span className='md:font-semibold text-center md:text-left pb-2 font-medium'>{element.name} has requested to book your property '{element.property}'.</span>
              <span className='flex justify-between md:w-4/5 w-[95%]'>
                <span className='text-secondary lg:text-[15px] text-[13px] font-light block leading-8 '>
                  Check-in: {element.checkin}
                </span>
                <span className='text-secondary lg:text-[15px] text-[13px] font-light block leading-8 '>
                  Check-out: {element.checkout}
                </span>
              </span>
              <span className='text-secondary lg:text-[15px] text-[13px] font-light text-center md:text-left darktxt '>
                Guests: {element.guests} guests
              </span>
            </div>
            <div className='flex items-center justify-center gap-2 pt-2 px-1 md:pt-0 md:px-0'>
              <button className='BookingButton fixebutton bg-green-600 dark:bg-green-700 m-2 md:m-0'>Accept</button>
              <button className='BookingButton fixebutton bg-red-500  dark:bg-red-700 text-white m-2 md:m-0'>Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookingRequests;
