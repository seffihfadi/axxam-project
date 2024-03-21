import React, { useState,useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { DateRange } from 'react-date-range';
import {format} from "date-fns";
function Reservation({rules}) {
  const [isChevronUp, setIsChevronUp] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [total, setTotal] = useState();
  const [date,setDate]=useState(false);
  const [calendar, setCalendar] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const toggleChevron = () => {
    setIsChevronUp(!isChevronUp);
  };
  const add_date=() => {
    setDate(!date)
  }
  useEffect(() => {
    setTotal(adults + children + infants);
  }, [adults, children, infants]);

  const incrementCounter = (type) => {
    setAdults(type === 'adult' ? adults + 1 : adults);
    setChildren(type === 'child' ? children + 1 : children);
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
    }]
  return (
    <div className=' p-7 sticky top-10 my-3 border w-full h-[46%]  border-gray-200  rounded-3xl shadow-md shadow-gray-400 flex flex-col gap-3 '>
      <div className='pb-4'>
        <span className='mr-2 font-semibold'>30000,00 DA</span>
        <span className='text-gray-600'>night</span>
      </div>
      <div className='grid grid-cols-1  border  border-gray-400 h-[30%] rounded-2xl cursor-pointer'>
         <div className='grid grid-cols-2' onClick={add_date}>
        <div class=' border-r border-r-gray-400  relative'>
          <p className='text-[12px] font-medium absolute top-3 left-5'>Check-in</p>
          <p className='text-[14px] text-gray-600 absolute top-7 left-5'>{`${format(calendar[0].startDate, "dd/MM/yyyy ")}`}</p>
        </div>
        <div class=' border-l  border-l-gray-400 relative '>
          <p className='text-[12px] font-medium absolute top-3 left-5'>Checkout</p>
          <p className='text-[14px] text-gray-600 absolute top-7 left-5'>{`${format(calendar[0].endDate, "dd/MM/yyyy ")}`}</p>
        </div>
        </div>
        {/*calendar sect */}
        {date && <div className=' absolute  z-50 bottom-[-10%] left-[7%] '><DateRange
            editableDateInputs={true}
            onChange={item => setCalendar([item.selection])}
            moveRangeOnFirstSelection={false}
           ranges={calendar}
        /> </div>}
         <div class='col-span-2 w-full border-t  border-t-gray-400 relative  ' onClick={toggleChevron} >
          <p className='text-[12px] font-medium absolute top-3 left-5'>Guests</p>
          <p className='text-[14px] text-gray-600 absolute top-7 left-5'>{total} guest{total>1 && <span>s</span>}</p>
          <div className='absolute right-5 top-5'>
          {isChevronUp ? <FaChevronUp /> : <FaChevronDown />}</div>
        </div>
       {/*guests sect*/}
        {isChevronUp  && (  
        <div className='border  border-gray-400 h-[75%] w-[85%]  p-7 rounded-3xl absolute top-[43%] - z-10 bg-whitemode flex flex-wrap gap-2 justify-end  '>
          <div className='grid grid-cols-[2fr,1fr]  overflow-hidden  '>
            <div className='flex  flex-col gap-10 ' >
              {guests.map((Guest) => (
                <div>
                  <p className='font-semibold text-[16px]'>{Guest.guest}</p>
                  <p className=' text-gray-600 text-[13px]'>{Guest.age}</p>
                </div>))}
            </div> 
            <div className='flex flex-col gap-12  p-1 w-[100%]  '  >
              <div className=' guest_number  '>
                <button onClick={()=>{decrementCounter("adult");Total()}} className='inc_dec_button '>-</button>
                {adults}
                <button onClick={()=>{incrementCounter("adult") ;Total()}} className='inc_dec_button'>+</button>
              </div>
              <div className=' guest_number'>
                <button onClick={()=>{decrementCounter("child");Total()}} className='inc_dec_button'>-</button>
                 {children}
                <button onClick={()=>{incrementCounter("child");Total()}} className='inc_dec_button'>+</button>
              </div>
              <div className='guest_number'>
                <button onClick={()=>{decrementCounter("infant");Total()}} className='inc_dec_button'>-</button>
                {infants}
                <button onClick={()=>{incrementCounter("infant");Total()}} className='inc_dec_button'>+</button>
              </div>
            </div>
          </div>
          <div className='text-[13px] text-gray-600 py-3 '>This place has {rules[2].max_guest},  not including infants.</div>
          <div onClick={toggleChevron} className='text-primary underline underline-offset-1 text-end  ' >Close </div>
       </div>)}
     </div>
     <button className='flex  justify-center items-center border cursor-pointer h-[14%] rounded-2xl  text-white bg-primary font-semibold text-20'>Reserve</button>
     <div className='flex justify-center  text-gray-600 pb-3'>You won't be charged yet</div>
     <div className='flex justify-between font-medium  before:h-[1px] before:w-full before:bg-gray-300  before:absolute relative before:bottom-[-35px] '>
        <h2>30 000 DA X 5 nights</h2>
        <h2>150 000 DA</h2>
     </div>
   {/*totalsect*/}
     <div className='flex justify-between pt-12 font-medium '>
       <h1 className='font-semibold text-lg'>Total</h1>
       <h2>150 000 DA</h2>
     </div>
</div>
 );}

export default Reservation;
