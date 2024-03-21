import React from 'react'
import { CiHeart } from "react-icons/ci";
import Reviews from "./Reviews";
import Host from './Host';
import Reservation from "./Reservation";
function PropertyDetails({data,rules,offers,owner}){
  return (
  <div className='my-10  container'>
   <div className='flex justify-between my-5'>
     <h1 className=' text-2xl  font-bold'>{data.accommodation_title}</h1>
     <div className='flex  items-center  text-xl hover:cursor-pointer '> 
       <CiHeart/>
       <h2 className='underline underline-offset-1'>save</h2>
     </div>
   </div>
 {/*picturessec*/}
    <div className=" flex gap-5 rounded-3xl overflow-hidden my-5">
     <div className='w-full'>
        <img className=" " src={data.image1} alt=""/>
     </div>
     <div className="grid grid-cols-2 w-full gap-x-5 gap-y-3.5" >
        <img className=" " src={data.image2} alt=""/>
        <img  className=" " src={data.image3} alt=""/>
        <img className="" src={data.image4} alt=""/>
        <img  className=" " src={data.image5} alt=""/>
     </div>
    </div>
    <div className='grid grid-cols-[2fr,1fr] '>
    <div className=''>
     {/*locationsect */}
     <div class="my-2">
       <h1 className='font-bold text-2xl pb-2'>{data.location}</h1>
       <h className="w-50 ">{data.accommodation_config}</h>
     </div>
     {/*hostsect */}
       <Host owner={owner}/>
    {/*descriptionsect */}
    <div className='my-5 w-[90%] border border-gray-300  rounded-3xl'>
      <div className='p-5'> 
      <h2 className='font-bold py-1 '>Description</h2>
      {data.description}
      </div>
    </div>
    {/*rulessect*/}
    <div className='my-10 w-[90%] border-b border-gray-300 pb-5 '>
      <h1 className='font-bold text-xl my-4'>House Rules:</h1>
      <div className='flex flex-wrap flex-col  h-[180px]'>
      {rules.map((rule) => ( 
       <div className='flex gap-2 py-1 items-center'> 
       {Object.values(rule)} 
      </div> 
      ))}    
      </div>
    </div>
    {/*offersect*/}
    <div className='my-9  w-[90%]   '>
    <h1 className='font-bold text-xl my-4'>What this place offers:</h1>
    <div className='flex flex-wrap flex-col gap-1 h-[180px]'>
      {offers.map((offer) => ( 
       <div className='flex gap-2 py-1 items-center'> 
       {Object.values(offer)} 
      </div> 
      ))}
      </div>    
    </div>
    </div>
    <Reservation rules={rules}/>


    </div>
  </div>   
    
  )
}

export default PropertyDetails
