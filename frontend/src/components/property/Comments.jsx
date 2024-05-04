import React from "react";
import Popup from "../common/Popup";
import { FaRegMessage } from 'react-icons/fa6';
import { TbLocation } from 'react-icons/tb';
import { GoPeople } from 'react-icons/go';
import { MdOutlineCleaningServices } from 'react-icons/md';
import RatingDisplay from '../common/RaitingDisplay'
import Comment from "./Comment";
import StarRating from "./StarRating";

function Comments({handleClose,owner,comments}) {
 
  return (
    <>
      <Popup
        children={
          <div className="w-[80%]  bg-white dark:bg-darkmode rounded-xl lg:h-[90%]  h-[50%] overflow-hidden shadow-xl py-6 px-0 relative">
            <div className="w-full mx-auto h-[86vh] overflow-y-auto ">
              <div className="px-4 border-b pb-4 sticky top-0 bg-white dark:bg-darkmode  dark:border-b-gray-600  z-50 font-semibold">
              <button onClick={handleClose}  className="absolute left-6">X</button>
              <div className="text-center">
              Guests Reviews
              </div>
              </div>
              <div className=" px-6 py-4 lg:grid lg:grid-cols-[3fr,1.9fr]  flex flex-col items-center lg:items-start  ">
                <div>
                  <h1 className="md:text-start text-center font-bold text-xl lg:pt-0 pt-2">{comments.length} review{comments.length>1 && <span>s</span>}</h1>
                  <div >
                    <Comment comments={comments}/>
                  </div>
                 </div>
                <div className="lg:sticky lg:top-14 p-6 h-[520px] border  dark:border-gray-600  rounded-2xl shadow-md flex flex-col gap-2 md:w-[80%] lg:w-full mt-4 lg:mt-0  ">
               {/* <div className="user ">
                    <img src={owner.picture} alt="owner" className="img" />
                    <div > md:w-[80%] 
                      <span className='text-base font-bold'>Hosted by {owner.name} </span>
                      <p className="flex items-center gap-2 text-sm font-semibold">
                      <img src="../../../public/star.svg" alt="star" />
                     {owner.rate}
                      </p>
                   </div>
               </div>*/}
                  <div className="text-black text-sm text-center font-mediu darktxt">
                    Ready to rate? Cleanliness, neighbors, communication, location – give us your stars!
                  </div>
                  <div >
                  <div className="flex justify-between border-b  border-b-gray-200 dark:border-b-gray-600  py-6">
                    <span className="flex items-center gap-4 text-black ">
                     <MdOutlineCleaningServices size={18}/> Cleanliness
                    </span>
                    <span className="font-semibold">
                     {/*owner.cleanliness_rate*/}
                     <StarRating initialValue={0} onRatingChange={(rating) => console.log("Neighbours Rating:", rating)} />
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-b-gray-200  dark:border-b-gray-600  py-6">
                  <span className="flex items-center gap-4 text-black   ">
                     <FaRegMessage size={18}/>
                     Communication
                    </span>
                   <StarRating initialValue={0} onRatingChange={(rating) => console.log("Neighbours Rating:", rating)} />
                 </div>
                  <div className="flex justify-between border-b border-b-gray-200  dark:border-b-gray-600  py-6">
                  <span className="flex items-center gap-4 text-black">
                     <TbLocation size={18}/>
                      Location
                  </span>
                 <StarRating initialValue={0} onRatingChange={(rating) => console.log("Neighbours Rating:", rating)} />
                </div>
                  <div className="flex justify-between pt-6 pb-3">
                  <span className="flex items-center gap-4 text-black">
                     <GoPeople size={18}/>
                     Neighbours
                    </span>
                      <StarRating initialValue={0} onRatingChange={(rating) => console.log("Neighbours Rating:", rating)} />
                  </div>
                 </div>
                 <div className=" flex flex-col relative mt-4 text-sm text-gray-400 dark:text-gray-300">
                 <textarea
                   id="description"
                  className=" h-[130px] overflow-auto resize-none px-3 py-3  rounded-xl border-[1px] border-gray-300 dark:border-gray-600  dark:bg-darkmode outline-none focus:border-gray-600"
                  placeholder="Your feedback about ahmed’s property ..."
               />
                </div>
           </div>
           </div>
            </div>
              
          </div>
          
        }
      />
    </>
  );
}

export default Comments;
