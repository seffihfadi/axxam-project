import React, { useState,useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { DateRange } from 'react-date-range';
import {format} from "date-fns";
import { CalculateTotalPrice } from '../common/CalculateTotalPrice';
import { differenceInDays } from 'date-fns';

import { useCreateCheckoutSessionMutation } from '../../features/bookings/bookingsApiSlice';
import { useDispatch } from "react-redux";
import { setAlert } from '../../app/slices/alertSlice';
import { useStripe } from "@stripe/react-stripe-js";

import LongStayDiscount from './LongStayDiscount';
import PersonsDiscout from './PersonsDiscount'


function Reservation({ property }) {

  const [numberOfDays, setNumberOfDays] = useState(1);
  const [isChevronUp, setIsChevronUp] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [total, setTotal] = useState(1);
  const [date,setDate]=useState(false);
  const [calendar, setCalendar] = useState([
    {
      startDate: new Date(),
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      key: 'selection'
    }
  ]);

  const stripe = useStripe()
  const dispatch = useDispatch()
  const [createCheckoutSession, { isLoading }] = useCreateCheckoutSessionMutation();

  useEffect(() => {
    const startDate = calendar[0].startDate;
    const endDate = calendar[0].endDate;
    const days = differenceInDays(endDate, startDate) + 1;
    setNumberOfDays(days);
  }, [calendar]);
  

  const toggleChevron = () => {
    setIsChevronUp(!isChevronUp);
  };

  const add_date = () => {
    setDate(!date)
  }

  useEffect(() => {
    setTotal(adults + children + infants);
  }, [adults, children, infants]);

  const incrementCounter = (type) => {
    if (total < parseInt(10)) { 
      setAdults(type === 'adult' ? adults + 1 : adults);
      setChildren(type === 'child' ? children + 1 : children);
    }
    setInfants(type === 'infant' ? infants + 1 : infants);
  };

  const decrementCounter = (type) => {
    setAdults(type === 'adult' ? (adults > 1 ? adults - 1 : adults) : adults);
    setChildren(type === 'child' ? (children > 0 ? children - 1 : children) : children);
    setInfants(type === 'infant' ? (infants > 0 ? infants - 1 : infants) : infants);
  };

  const guests=[
    { 
      guest:"Adults",
      age:"Age +18"
    },
    { 
      guest:"Children",
      age:"Age 2-17 "
    },
    { 
      guest:"Infants",
      age:"Under 2"
    }
  ]

  const Guests = {
    Adults: adults,
    Children: children,
    Infants: infants
  };


  const handleCheckout = async () => {
    const reservationDetails = {
      checkin: new Date(calendar[0].startDate),
      checkout: new Date(calendar[0].endDate),
      guests: {
        adults,
        children,
        infants
      }
    }

    // console.log('reservationDetails', reservationDetails)

    await createCheckoutSession({reservationDetails, announcementID: property._id})
      .unwrap()
      .then(async (payload) => {

        const { sessionId } = payload;
        const { error } = await stripe.redirectToCheckout({
          sessionId
        });
    
        if (error) {
          console.log(error);
        }
      })
      .catch((error) => dispatch(setAlert([error.data.message, 'error'])))

  }

  

  return (
    <div className='mx-auto h-fit lg:mx-0 p-7 lg:sticky lg:top-24 my-3 border w-full md:w-1/2 lg:w-full border-gray-200  rounded-2xl shadow-md flex flex-col gap-3 dark:border-gray-600 dark:shadow-gray-700'>
      <div className='pb-4'>
        <span className='mr-2 font-semibold'>{property.price / 100},00 DZD </span>
        <span className='text-gray-600'>night</span>
      </div>
      <div className='grid grid-cols-1  border  border-gray-400 dark:border-gray-600 h-full md:h-[30%] rounded-2xl cursor-pointer relative'>
        <div className='grid grid-cols-2' onClick={add_date}>
        <div class=' border-r border-r-gray-400 dark:border-r-gray-600 flex justify-center items-start flex-col pl-4 py-3 lg:py-2'>
          <p className='text-xs font-medium'>Check-in</p>
          <p className='text-sm text-gray-600'>{`${format(calendar[0].startDate, "dd/MM/yyyy ")}`}</p>
        </div>
        <div class=' border-l  border-l-gray-400 dark:border-l-gray-600 flex justify-center items-start flex-col pl-4 py-3 lg:py-2'>
          <p className='text-xs font-medium'>Checkout</p>
          <p className='text-sm text-gray-600'>{`${format(calendar[0].endDate, "dd/MM/yyyy ")}`}</p>
        </div>
        </div>
        {/*calendar sect */}
        {date && 
          <div className='absolute z-50 bottom-[50%] left-[50%] translate-x-[-50%] h-0'>
            <DateRange
              editableDateInputs={true}
              onChange={item => setCalendar([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={calendar}
              
            /> 
          </div>
        }
        <div class='col-span-2 w-full border-t  border-t-gray-400 dark:border-t-gray-600 relative flex flex-col justify-center items-start pl-4 py-3 lg:py-2' onClick={toggleChevron} >
          <p className='text-xs font-medium'>Guests</p>
          <p className='text-sm text-gray-600'>{total} guest{total>1 &&<span>s</span>}</p>
          <div className='absolute right-5 top-5'>
          {isChevronUp ? <FaChevronUp /> : <FaChevronDown />}</div>
        </div>
        {/*guests sect*/}
        {isChevronUp  && (  
        <div className='border  mt-2 border-gray-400 dark:border-gray-600  w-full p-7 rounded-3xl absolute top-[100%] left-[50%] translate-x-[-50%] z-10 bg-whitemode dark:bg-darkmode  flex flex-wrap gap-2 justify-end'>
          <div className='grid grid-cols-[2fr,1fr]  overflow-hidden'>
            <div className='flex  flex-col gap-10 ' >
              {guests.map((Guest) => (
                <div>
                  <p className='font-semibold'>
                    {Guest.guest}
                    {property.reductions[Guest.guest.toLowerCase()] > 0 &&
                      <span className='text-green-500 text-xs px-1'>
                        ({property.reductions[Guest.guest.toLowerCase()]}%)
                      </span>
                    }
                  </p>
                  <p className=' text-gray-600 text-[13px]'>{Guest.age}</p>
                </div>))}
            </div> 
            <div className='flex flex-col gap-12 p-1 w-full'  >
              <div className=' guest_number  '>
                <button onClick={()=>{decrementCounter("adult")}} className='inc_dec_button '>-</button>
                <span className='w-2'>{adults}</span>
                <button onClick={()=>{incrementCounter("adult")}} className='inc_dec_button'>+</button>
              </div>
              <div className=' guest_number'>
                <button onClick={()=>{decrementCounter("child")}} className='inc_dec_button'>-</button>
                <span className='w-2'>{children}</span>
                <button onClick={()=>{incrementCounter("child")}} className='inc_dec_button'>+</button>
              </div>
              <div className='guest_number'>
                <button onClick={()=>{decrementCounter("infant")}} className='inc_dec_button'>-</button>
                <span className='w-2'>{infants}</span>
                <button onClick={()=>{incrementCounter("infant")}} className='inc_dec_button'>+</button>
              </div>
            </div>
          </div>
          <div className='text-[13px] text-gray-600 py-3'>This place has {property.maxPersons},  not including infants.</div>
          <div onClick={toggleChevron} className='text-primary font-semibold text-end '>Close </div>
        </div>)}
      </div>
      <button disabled={isLoading} onClick={handleCheckout} className='flex  justify-center items-center border cursor-pointer h-[14%] py-4 rounded-2xl dark:border-none text-white bg-primary font-semibold'>Reserve</button>
      <div className='flex justify-center  text-gray-600 pb-3'>You won't be charged yet</div>
      <div className='flex py-2 justify-between font-medium  border-b-[1px] border-gray-300 dark:border-gray-600 relative '>
        <h2>{property.price / 100},00 X {numberOfDays-1} nights</h2>
        <h2>{property.price * (numberOfDays-1) / 100},00 DZD</h2>
      </div>
      <div className="extradetails">
        <LongStayDiscount days={numberOfDays-1} originalPrice={(property.price / 100) * (numberOfDays-1)} />
        <PersonsDiscout guests={{adults, children, infants}} property={property} numberOfDays={numberOfDays-1} />

        
      </div>
    {/*totalsect*/}
      <div className='flex justify-between items-center font-medium'>
        <h1 className='font-semibold text-lg'>Total</h1>
        <h2><CalculateTotalPrice days={numberOfDays-1} announcement={property} guests={Guests}/> DZD</h2>
      </div>
</div>
)}

export default Reservation;
