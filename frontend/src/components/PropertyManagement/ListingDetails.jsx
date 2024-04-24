import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import { amenities } from '../common/Ameneties';
function ListingDetails({propertyRules}) {
  const [isAmenitiesChevronUp, setIsAmenitiesChevronUp] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [isRulesChevronUp, setIsRulesChevronUp] = useState(false);
  const [maxGuest, setMaxGuest] = useState(1);
  const toggleAmenitiesChevron = () => {
    setIsAmenitiesChevronUp(!isAmenitiesChevronUp);
  };
  const toggleRulesChevron = () => {
    setIsRulesChevronUp(!isRulesChevronUp);
  };
  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prevSelectedAmenities) => {
      if (prevSelectedAmenities.includes(amenity)) {
        return prevSelectedAmenities.filter((selectedAmenity) => selectedAmenity !== amenity);
      } else {
        return [...prevSelectedAmenities, amenity];
      }
    });
  };
  const incrementCounter = () => {
    setMaxGuest(maxGuest + 1);
  };
  const decrementCounter = () => {
    setMaxGuest(maxGuest > 1 ? maxGuest - 1 : maxGuest);
  };
  const [text, setText] = useState(''); 
  const handleChange = (event) => {
    const newText = event.target.value;
    if (newText.length <= 255) {
      setText(newText); // Mettre à jour le contenu du textarea
    }
  };
  
  return (
    <div className='flex my-40 mt-20 items-center flex-col gap-12 '>
      {/* add description*/}
      <div className="flex flex-col relative lg:w-[76%]  md:w-[96%] w-full ">
      <label htmlFor="description" className="absolute top-6  bg-white dark:bg-darkmode left-5 text-gray-700 transition-all cursor-text select-none dark:text-white">
        Description
      </label>
      <textarea
        id="description"
        value={text} 
        onChange={handleChange} 
        className="md:h-[210px] h-[290px]  resize-none px-7 py-14 rounded-lg outline-none border-[1.5px] border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-300 dark:bg-darkmode"
        maxLength={255} 
      />
      <span className="absolute bottom-6 right-5">{text.length}/255</span> 
    </div>
      {/* Select rules */}
      <div className='p-5 lg:w-[76%] md:w-[96%] w-full border border-gray-300 dark:border-gray-600 rounded-lg relative z-50' 
      onClick={toggleRulesChevron}>
        <div className=' flex justify-between items-center'>
        <span>Rules</span>
        <span>
          {isRulesChevronUp ? <FaChevronUp /> : <FaChevronDown />}
        </span>
        </div>
       {isRulesChevronUp && (
        <div className='absolute md:top-12 right-2 md:right-4 z-50 w-[96%] bg-white dark:bg-darkmode border border-gray-100 rounded-xl shadow-lg
         shadow-gray-300 flex flex-col gap-3 dark:border-gray-600 dark:shadow-gray-800 text-sm'
         onClick={(e) => e.stopPropagation()}>
         <div className='flex justify-between border-b py-3 px-6'>
            <div className='flex items-center gap-3 te'>
            <span style={{ fontSize: '17px' }}>{propertyRules[2].icon}</span>
              <span>Number of guests (maximum)</span>
            </div>
             <div className=' guest_number '>
                <button onClick={decrementCounter} className='inc_dec_button '>-</button>
                <span className='w-2'>{maxGuest}</span>
                <button onClick={incrementCounter} className='inc_dec_button'>+</button>
              </div>
         </div>
         <div className='flex gap-3 border-b px-6 pb-4 style_input '>
            <label htmlFor="check_in" className='flex items-center gap-3 '>
             <span style={{ fontSize: '17px' }}>{propertyRules[0].icon}</span>
              <span>Check-in : </span>
            </label>
            <input id="check_in" name="check_in" type="text" placeholder='ex after 5pm' className='dark:bg-darkmode' required />
         </div>
         <div className='flex gap-3 border-b px-6 pb-4 style_input '>
            <label htmlFor="checkout" className='flex items-center gap-3 '>
             <span style={{ fontSize: '17px' }}>{propertyRules[1].icon}</span>
              <span>Check-in : </span>
            </label>
            <input id="checkout" name="checkout" type="text" placeholder='ex before 11 am' className='dark:bg-darkmode' required />
         </div>
         <div className='flex justify-between border-b pl-6 pr-8 pb-4 '>
            <label htmlFor="smoking" className='flex items-center gap-3 '>
             <span style={{ fontSize: '17px' }}>{propertyRules[3].icon}</span>
              <span>{propertyRules[3].smoking}</span>
            </label >
            <input id="smoking" name="smoking" type="checkbox" required />
         </div>
         <div className='flex justify-between  pl-6 pr-8 pb-4 '>
            <label htmlFor="parties" className='flex items-center gap-3 '>
             <span style={{ fontSize: '17px' }}>{propertyRules[4].icon}</span>
              <span>{propertyRules[4].parties}</span>
            </label>
            <input id="parties" name="parties" type="checkbox" required />
         </div>
        <div className='text-center px-4 pb-5 lg:pt-7 '>
          <button className=' lg:px-10 px-9 lg:py-4 py-3 rounded-lg bg-primary text-white font-semibold w-fit'>Apply</button>
        </div>

        </div>
      )}
      </div>
      {/* Select amenities */}
    <div className='p-5 lg:w-[76%]  md:w-[96%] w-full border border-gray-300 dark:border-gray-600 rounded-lg relative mb-44 z-40' onClick={toggleAmenitiesChevron}>
      <div className='flex justify-between items-center '>
        <span>Amenities</span>
        <span>
          {isAmenitiesChevronUp ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>
      {isAmenitiesChevronUp && (
        <div className='absolute md:top-12 right-2 md:right-4 p-4 w-[96%] max-h-[330px] overflow-y-auto bg-white dark:bg-darkmode border border-gray-100 
        rounded-xl shadow-lg  shadow-gray-300 flex flex-col gap-3 dark:border-gray-600 dark:shadow-gray-700 z-50' 
        onClick={(e) => e.stopPropagation()}>
          <div className='grid lg:grid-cols-4 md:grid-cols-3  gap-5 py-2'>
            {Object.entries(amenities).map(([key, icon]) => (
              <div
                key={key}
                className={`flex items-center gap-1 border rounded-lg h-[80px] p-5 ${selectedAmenities.includes(key) ? 'border-primary' : ''}`}
                onClick={() => toggleAmenity(key)}>
                <span style={{ fontSize: '18px' }} className={selectedAmenities.includes(key) ? 'text-primary' : ''}>{icon}</span>
                <span className={`ml-2 text-sm  ${selectedAmenities.includes(key) ? 'text-primary' : ''}`}>{key.replace(/_/g, ' ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}</div>
      


    </div>
    
  );
}

export default ListingDetails;
