import React from 'react'
import Reservation from "./Reservation";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import { Rules } from '../common/Rules';
// import PaymentIntegration from '../reservation/PaymentIntegration';
import { Amenities } from '../common/Ameneties';
import SaveButton from './SaveButton';
import Host from './Host';



function PropertyDetails({ property, handleOpen, owner, reviews }){


  return (
  <div className='mb-5 mt-28 container'>
    <div className='flex justify-between my-5 gap-1'>
      <h1 className='text-xl md:text-2xl font-bold'>{property.title}</h1>
      <SaveButton propID={property._id} isSaved={property.isSaved} text />
    </div>

    {/*picturessec*/}
    <div className="picture-section">
      <div className="md:w-full relative">
        <img className="opacity-0 img md:hidden" src={property.images[0].secure_url} alt="img" />
        <div className="wrap transform -translate-x-0 -translate-y-full md:transform-none w-full h-full overflow-hidden rounded-lg md:rounded-none">
          <ReactPhotoSphereViewer
            src={property.images[0].secure_url}
            height={"100%"}
            width={"100%"}
          ></ReactPhotoSphereViewer>
        </div>
      </div>     
      <div className="flex md:grid md:grid-cols-2 w-max md:w-full gap-3" >
        {property.images.slice(1, 5).map((img) => 
          <div className="w-full aspect-[9/7]">
            <img className="img w-full h-full object-cover" src={img.secure_url} alt="img" />
          </div>
        )}
      </div>
    </div>
  <div className='lg:grid lg:grid-cols-[2fr,1fr] '>
    <div>
     {/*locationsect */}
      <div className="my-2">
        <h1 className='font-bold text-xl md:text-2xl pb-2'>{property.location.name}</h1>
        <h1 className='text-sm md:text-base'>4 guests,  3 badrooms,  3 bads,  1 bath </h1>
      </div>

     {/*hostsect */}
      <Host owner={owner} handleOpen={handleOpen} reviews={reviews}/>

      {/*descriptionsect */}
      <div className='my-5 w-full md:w-[90%] border border-gray-300 dark:border-gray-600 rounded-3xl text-sm md:text-base'>
        <div className='p-5'> 
        <h2 className='font-bold py-1 '>Description</h2>
          {property.desc}
        </div>
      </div>
      {/*rulessect*/}
      <div className='my-10 w-[90%] border-b border-gray-300 dark:border-gray-600 pb-5 lg:pb-10 '>
        <h1 className='font-semibold text-lg md:text-xl my-4'>House Rules:</h1>
        <div className='flex flex-wrap flex-col  max-h-[200px] gap-1'>
        {property.rules.map((key, i) => ( 
          <div key={i} className='flex svgi gap-3 py-1 items-center md:text-[17px]'> 
            {Rules[key]?.icon} 
            <span className='capitalize'>{Rules[key]?.content} </span>
          </div> 
        ))}    
        </div>
      </div>
      {/*offersect*/}
      <div className='my-10  w-[90%] border-b lg:border-none border-gray-300 dark:border-gray-600 pb-5 lg:pb-0'>
        <h1 className='font-semibold text-lg md:text-xl my-4'>What this place offers:</h1>
        <div className='flex flex-wrap flex-col gap-1 max-h-[200px] md:text-[17px]'>
          {property.tags.map((tag, i) => 
            <div key={i} className='flex svgi gap-3 py-1 items-center'> 
              {Amenities[tag]}
              <span className='capitalize'>{tag.replace(/_/g, ' ')}</span>
            </div> 
          )}
        </div>    
      </div>
    </div>
    <Reservation property={property}/>
  </div>
</div>   
    
  )
}

export default PropertyDetails
