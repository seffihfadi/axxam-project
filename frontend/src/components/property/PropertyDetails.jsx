import React from 'react'
import { CiHeart } from "react-icons/ci";
import Host from './Host';
import Reservation from "./Reservation";
function PropertyDetails({data,rules,offers,owner}){
  return (
  <div className='mb-5 mt-28  container'>
    <div className='flex justify-between my-5 gap-1'>
      <h1 className='text-xl md:text-2xl  font-bold'>{data.accommodation_title}</h1>
      <div className='flex  items-center text-lg md:text-xl hover:cursor-pointer '> 
        <CiHeart/>
        <h2 className='underline underline-offset-1'>save</h2>
      </div>
      </div>

    {/*picturessec*/}
    <div className="picture-section">
      <div className='md:w-full'>
        <img className="img" src={data.image1} alt=""/>
      </div>
      <div className="flex md:grid md:grid-cols-2 w-max md:w-full gap-x-5 md:gap-y-3.5" >
        <img className=" img" src={data.image2} alt=""/>
        <img  className="img" src={data.image3} alt=""/>
        <img className="img" src={data.image4} alt=""/>
        <img  className="img" src={data.image5} alt=""/>
      </div>
    </div>
  <div className='lg:grid lg:grid-cols-[2fr,1fr] '>
    <div>
     {/*locationsect */}
      <div class="my-2">
        <h1 className='font-bold text-xl md:text-2xl pb-2'>{data.location}</h1>
        <h1 className='text-sm md:text-base'>{data.accommodation_config}</h1>
      </div>

     {/*hostsect */}
      <Host owner={owner}/>

      {/*descriptionsect */}
      <div className='my-5 w-full md:w-[90%] border border-gray-300 dark:border-gray-600 rounded-3xl text-sm md:text-base'>
        <div className='p-5'> 
        <h2 className='font-bold py-1 '>Description</h2>
        {data.description}
        </div>
      </div>
      {/*rulessect*/}
      <div className='my-10 w-[90%] border-b border-gray-300 dark:border-gray-600 pb-5 lg:pb-10 '>
        <h1 className='font-bold text-lg md:text-xl my-4'>House Rules:</h1>
        <div className='flex flex-wrap flex-col  max-h-[200px] gap-1'>
        {rules.map((rule) => ( 
          <div className='flex gap-2 py-1 items-center md:text-[17px]'> 
            {Object.values(rule)} 
          </div> 
        ))}    
        </div>
      </div>
      {/*offersect*/}
      <div className='my-10  w-[90%] border-b lg:border-none border-gray-300 dark:border-gray-600 pb-5 lg:pb-0'>
      <h1 className='font-bold text-lg md:text-xl my-4'>What this place offers:</h1>
      <div className='flex flex-wrap flex-col gap-1 max-h-[200px] md:text-[17px]'>
        {Object.entries(offers).map(([offerName, icon]) => ( 
          <div key={offerName} className='flex gap-2 py-1 items-center'> 
            {icon}
            {offerName.replace(/_/g, ' ')} 
          </div> 
        ))}
        </div>    
      </div>
      </div>
      <Reservation rules={rules} data={data}/>
    </div>
  </div>   
    
  )
}

export default PropertyDetails
